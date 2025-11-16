"use server";

import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/options";
import QuizModel, { Quiz } from "@/model/Quiz";
import dbConnect from "@/db/connection";
import { Permissions } from "@/types/permissions";

/**
 * Dashboard Statistics Interface
 */
export interface DashboardStats {
  totalQuizzes: number;
  totalQuestions: number;
  myQuizzes: number;
  totalAttempts?: number;
}

/**
 * User Profile Interface
 */
export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  joinedDate: string;
  _id: string;
  permissions: Permissions;
}

/**
 * Dashboard Data Interface
 */
export interface DashboardData {
  stats: DashboardStats;
  user: UserProfile;
  recentlyQuizzes: Quiz[];
}

/**
 * Fetch all dashboard data (stats, user profile, recently modified quizzes)
 * Returns comprehensive dashboard information for authenticated users
 */
export async function getDashboardData(
  session: Session
): Promise<DashboardData> {
  try {
    await dbConnect();

    const userId = session.user._id;

    // Parallel fetch for better performance
    const [userQuizzes, allQuizzes, userDoc] = await Promise.all([
      // Fetch user's quizzes
      QuizModel.find({ createdBy: userId })
        .select("title questions updatedAt description createdBy createdAt")
        .sort({ updatedAt: -1 })
        .lean(),

      // Fetch all quizzes (for platform stats)
      QuizModel.find({}).select("questions").lean(),

      // Fetch user profile (if extended info is stored)
      QuizModel.findOne({ createdBy: userId })
        .select("createdAt")
        .sort({ createdAt: 1 })
        .lean(),
    ]);

    // Calculate statistics
    const totalQuizzes = allQuizzes.length;
    const totalQuestions = allQuizzes.reduce(
      (sum, quiz) => sum + (quiz.questions?.length || 0),
      0
    );
    const myQuizzes = userQuizzes.length;

    // Get joined date (first quiz creation date or now)
    const joinedDate = userDoc?.createdAt
      ? new Date(userDoc.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

    // Build user profile
    const user: UserProfile = {
      name: session.user.name || "Quiz Master",
      email: session.user.email || "user@example.com",
      avatar: session.user.image || undefined,
      role: session.user.role || "user",
      permissions: session.user.permissions || [],
      joinedDate: joinedDate,
      _id: userId,
    };

    // Build stats
    const stats: DashboardStats = {
      totalQuizzes,
      totalQuestions,
      myQuizzes,
      totalAttempts: 0, // Can be enhanced with attempts tracking
    };

    const modified: Quiz[] = userQuizzes.slice(0, 5).map((e) => ({
      _id: e._id.toString(),
      title: e.title,
      description: e.description,
      questions: e.questions,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      createdBy: e.createdBy.toString(),
    }));

    return {
      stats,
      user,
      recentlyQuizzes: modified,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}

/**
 * Get only dashboard statistics (lightweight version)
 * Returns just stats without user profile for quick updates
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/");
    }

    const userId = session.user._id;

    const [userQuizzes, allQuizzes] = await Promise.all([
      QuizModel.find({ createdBy: userId }).select("questions").lean(),
      QuizModel.find({}).select("questions").lean(),
    ]);

    const totalQuizzes = allQuizzes.length;
    const totalQuestions = allQuizzes.reduce(
      (sum, quiz) => sum + (quiz.questions?.length || 0),
      0
    );
    const myQuizzes = userQuizzes.length;

    return {
      totalQuizzes,
      totalQuestions,
      myQuizzes,
      totalAttempts: 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard stats");
  }
}

/**
 * Get user profile information
 * Returns authenticated user's profile data
 */
export async function getUserProfile(): Promise<UserProfile> {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/");
    }

    const userId = session.user._id;

    // Get first quiz creation date (joined date)
    const firstQuiz = await QuizModel.findOne({ createdBy: userId })
      .select("createdAt")
      .sort({ createdAt: 1 })
      .lean();

    const joinedDate = firstQuiz?.createdAt
      ? new Date(firstQuiz.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

    return {
      name: session.user.name || "Quiz Master",
      email: session.user.email || "user@example.com",
      avatar: session.user.image || undefined,
      role: session.user.role,
      permissions: session.user.permissions || [],
      joinedDate,
      _id: userId,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
}

/**
 * Get recently modified quizzes
 * Returns last modified quizzes for quick access
 */
export async function getRecentlyModifiedQuizzes(limit: number = 5): Promise<
  Array<{
    _id: string;
    title: string;
    updatedAt: Date;
    questionCount: number;
  }>
> {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/");
    }

    const userId = session.user._id;

    const quizzes = await QuizModel.find({ createdBy: userId })
      .select("title updatedAt questions")
      .sort({ updatedAt: -1 })
      .limit(limit)
      .lean();

    return quizzes.map((quiz) => ({
      _id: quiz._id.toString(),
      title: quiz.title,
      updatedAt: quiz.updatedAt,
      questionCount: quiz.questions?.length || 0,
    }));
  } catch (error) {
    console.error("Error fetching recently modified quizzes:", error);
    throw new Error("Failed to fetch recently modified quizzes");
  }
}

/**
 * Get platform-wide statistics
 * Returns total quizzes and questions across entire platform
 */
export async function getPlatformStats(): Promise<{
  totalQuizzes: number;
  totalQuestions: number;
}> {
  try {
    await dbConnect();

    const quizzes = await QuizModel.find({}).select("questions").lean();

    const totalQuizzes = quizzes.length;
    const totalQuestions = quizzes.reduce(
      (sum, quiz) => sum + (quiz.questions?.length || 0),
      0
    );

    return {
      totalQuizzes,
      totalQuestions,
    };
  } catch (error) {
    console.error("Error fetching platform stats:", error);
    throw new Error("Failed to fetch platform stats");
  }
}

/**
 * Get user statistics
 * Returns statistics for authenticated user only
 */
export async function getUserStats(): Promise<{
  myQuizzes: number;
  myQuestions: number;
}> {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/");
    }

    const userId = session.user._id;

    const quizzes = await QuizModel.find({ createdBy: userId })
      .select("questions")
      .lean();

    const myQuizzes = quizzes.length;
    const myQuestions = quizzes.reduce(
      (sum, quiz) => sum + (quiz.questions?.length || 0),
      0
    );

    return {
      myQuizzes,
      myQuestions,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw new Error("Failed to fetch user stats");
  }
}
