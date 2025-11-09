"use server";
import { FlattenMaps, Types } from "mongoose";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/options";
import QuizModel from "@/model/Quiz";
import dbConnect from "@/db/connection";

/**
 * Plain quiz type for serialization to client components
 */
export interface PlainQuiz {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  questions?: Array<{
    questionText: string;
    options: string[];
    correctAnswer: string;
  }>;
}

/**
 * Fetch all quizzes with optional pagination (Admin-only - requires authentication).
 * Returns only quizzes created by the logged-in admin.
 */
export async function getAllQuizzes(
  limit = 50,
  skip = 0
): Promise<PlainQuiz[]> {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const quizzes = await QuizModel.find({ createdBy: session.user._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const res: PlainQuiz[] = quizzes.map((item) => ({
    _id: item._id.toString(),
    title: item.title,
    description: item.description,
    questions: item.questions,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    createdBy: item.createdBy?.toString(),
  }));

  return res;
}

export async function recentlyModifiedQuizzes(limit = 5): Promise<
  {
    _id: string;
    title: string;
    updatedAt: Date;
  }[]
> {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const quizzes = await QuizModel.find({ createdBy: session.user._id })
    .select("title updatedAt")
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();

  const res = quizzes.map((item) => ({
    _id: item._id.toString(),
    title: item.title,
    updatedAt: item.updatedAt,
  }));

  return res;
}

/**
 * Fetch all public quizzes (No authentication required).
 * Returns all quizzes with full details for public viewing.
 */
export async function getPublicQuizzes(
  limit = 100,
  skip = 0
): Promise<PlainQuiz[]> {
  try {
    await dbConnect();

    const quizzes = await QuizModel.find({})
      .select("title description createdAt updatedAt questions")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return quizzes.map((quiz) => ({
      _id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: quiz.questions,
    })) as PlainQuiz[];
  } catch (error) {
    console.error("Error fetching public quizzes:", error);
    throw new Error("Failed to fetch quizzes");
  }
}

/**
 * Fetch a specific quiz by its MongoDB ID (Admin version - requires auth).
 */
export async function getQuizById(id: string): Promise<
  FlattenMaps<{
    _id: Types.ObjectId;
    title: string;
    description?: string | undefined;
    questions: {
      questionText: string;
      options: string[];
      correctAnswer: string;
    }[];
    createdBy?: Types.ObjectId | undefined;
    createdAt: Date;
    updatedAt: Date;
  }> &
    Required<{
      _id: Types.ObjectId;
    }> & {
      __v: number;
    }
> {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const quiz = await QuizModel.findById(id).lean();

  if (!quiz) {
    notFound();
  }

  return quiz;
}

/**
 * Fetch a specific quiz by ID for public access (No authentication required).
 * Returns full quiz with questions for quiz-taking.
 */
export async function getPublicQuizById(id: string): Promise<PlainQuiz> {
  try {
    await dbConnect();

    const quiz = await QuizModel.findById(id)
      .select("title description questions createdAt updatedAt")
      .lean();

    if (!quiz) {
      notFound();
    }

    return {
      _id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: quiz.questions,
    } as PlainQuiz;
  } catch (error) {
    console.error("Error fetching public quiz:", error);
    notFound();
  }
}

/**
 * Create a new quiz (Admin-only).
 */
export async function createQuiz(data: {
  title: string;
  description?: string;
  questions: Array<{
    questionText: string;
    options: string[];
    correctAnswer: string;
  }>;
}): Promise<PlainQuiz> {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/");
    }

    const quiz = await QuizModel.create({
      ...data,
      createdBy: session.user._id,
    });

    return {
      _id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: quiz.questions,
    } as PlainQuiz;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw new Error("Failed to create quiz");
  }
}

/**
 * Update an existing quiz by ID (Admin-only).
 */
export async function updateQuiz(
  id: string,
  data: {
    title?: string;
    description?: string;
    questions?: Array<{
      questionText: string;
      options: string[];
      correctAnswer: string;
    }>;
  }
): Promise<PlainQuiz> {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/");
    }

    const quiz = await QuizModel.findOneAndUpdate(
      { _id: id, createdBy: session.user._id }, // Ensure user owns this quiz
      data,
      { new: true, runValidators: true }
    ).lean();

    if (!quiz) {
      notFound();
    }

    return {
      _id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: quiz.questions,
    } as PlainQuiz;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw new Error("Failed to update quiz");
  }
}

/**
 * Delete a quiz by ID (Admin-only).
 */
export async function deleteQuiz(id: string): Promise<void> {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect("/");
    }

    const quiz = await QuizModel.findOneAndDelete({
      _id: id,
      createdBy: session.user._id, // Ensure user owns this quiz
    });

    if (!quiz) {
      notFound();
    }
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw new Error("Failed to delete quiz");
  }
}

/**
 * Get quiz count for a specific admin user.
 */
export async function getAdminQuizCount(): Promise<number> {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return 0;
    }

    return await QuizModel.countDocuments({ createdBy: session.user._id });
  } catch (error) {
    console.error("Error counting quizzes:", error);
    throw new Error("Failed to count quizzes");
  }
}

/**
 * Get total public quiz count.
 */
export async function getPublicQuizCount(): Promise<number> {
  try {
    await dbConnect();
    return await QuizModel.countDocuments();
  } catch (error) {
    console.error("Error counting public quizzes:", error);
    throw new Error("Failed to count quizzes");
  }
}

/**
 * Search public quizzes by title (No authentication required).
 */
export async function searchPublicQuizzes(
  query: string,
  limit = 20
): Promise<PlainQuiz[]> {
  try {
    await dbConnect();

    const quizzes = await QuizModel.find({
      title: { $regex: query, $options: "i" }, // Case-insensitive search
    })
      .select("title description createdAt updatedAt questions")
      .limit(limit)
      .lean();

    return quizzes.map((quiz) => ({
      _id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: quiz.questions,
    })) as PlainQuiz[];
  } catch (error) {
    console.error("Error searching quizzes:", error);
    throw new Error("Failed to search quizzes");
  }
}
