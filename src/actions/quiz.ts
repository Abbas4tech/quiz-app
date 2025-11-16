"use server";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/app/api/auth/options";
import QuizModel, { Quiz } from "@/model/Quiz";
import dbConnect from "@/db/connection";
import { QuizForm } from "@/schemas/quiz";

/**
 * Plain quiz type for serialization to client components
 */
/**
 * Fetch all quizzes with optional pagination (Admin-only - requires authentication).
 * Returns only quizzes created by the logged-in admin.
 */
export async function getAllQuizzes(
  limit = 50,
  skip = 0
): Promise<{ message: string; data: Quiz[] }> {
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

  const res: Quiz[] = quizzes.map((item) => ({
    _id: item._id.toString(),
    title: item.title,
    description: item.description,
    questions: item.questions,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    createdBy: item.createdBy.toString(),
  }));

  return {
    message: "Successfully fetched Quizzes",
    data: res,
  };
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
export async function getPublicQuizzes(limit = 100, skip = 0): Promise<Quiz[]> {
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
    })) as Quiz[];
  } catch (error) {
    console.error("Error fetching public quizzes:", error);
    throw new Error("Failed to fetch quizzes");
  }
}

/**
 * Fetch a specific quiz by its MongoDB ID (Admin version - requires auth).
 */
export async function getQuizById(id: string): Promise<Quiz> {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const quiz = await QuizModel.findById(id).lean();

  if (!quiz) {
    notFound();
  }

  return {
    _id: quiz._id.toString(),
    title: quiz.title,
    description: quiz.description,
    questions: quiz.questions,
    createdAt: quiz.createdAt,
    updatedAt: quiz.updatedAt,
    createdBy: quiz.createdBy.toString(),
  };
}

/**
 * Fetch a specific quiz by ID for public access (No authentication required).
 * Returns full quiz with questions for quiz-taking.
 */
export async function getPublicQuizById(id: string): Promise<Quiz> {
  try {
    await dbConnect();

    const quiz = await QuizModel.findById(id)
      .select("title description questions createdAt createdBy updatedAt")
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
      createdBy: quiz.createdBy.toString(),
    };
  } catch (error) {
    console.error("Error fetching public quiz:", error);
    notFound();
  }
}

/**
 * Create a new quiz (Admin-only).
 */
export async function createQuiz(
  data: QuizForm
): Promise<{ message: string; data: Quiz; status: number }> {
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

    revalidatePath("/quizzes");
    revalidatePath("/dashboard/quiz/");
    revalidatePath("/dashboard/quiz/[id]");

    return {
      message: "Successfully created Quiz",
      data: {
        _id: quiz._id.toString(),
        title: quiz.title,
        description: quiz.description,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
        questions: quiz.questions,
        createdBy: quiz.createdBy.toString(),
      },
      status: 200,
    };
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
  data: QuizForm
): Promise<{ message: string; data: Quiz; status: number }> {
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

    revalidatePath("/quizzes");
    revalidatePath("/dashboard/quiz/");
    revalidatePath("/dashboard/quiz/[id]");

    return {
      message: "Successfully Updated Quiz..",
      data: {
        _id: quiz._id.toString(),
        title: quiz.title,
        description: quiz.description,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
        questions: quiz.questions,
        createdBy: quiz.createdBy.toString(),
      },
      status: 200,
    };
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

    revalidatePath("/quizzes");
    revalidatePath("/dashboard/quiz/");
    revalidatePath("/dashboard/quiz/[id]");
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw new Error("Failed to delete quiz");
  }
}
