import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/db/connection";
import QuizModel from "@/model/Quiz";
import { authOptions } from "@/app/api/auth/options";
import { quizSchema } from "@/schemas/quiz";

/**
 * GET - Fetch single quiz by ID (Public access allowed)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params; // ← Await params

    const quiz = await QuizModel.findById(id).lean();

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Return quiz with stringified _id
    return NextResponse.json({
      _id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update quiz (Admin only - requires authentication)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    await dbConnect();

    const { id } = await params; // ← Await params

    const body = await request.json();

    // Validate with Zod schema
    const validationResult = quizSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const quizData = validationResult.data;

    // Update quiz - ensure it belongs to the admin
    const quiz = await QuizModel.findOneAndUpdate(
      {
        _id: id,
        createdBy: session.user._id, // Ensure ownership
      },
      quizData,
      { new: true, runValidators: true }
    ).lean();

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found or you don't have permission to update it" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Quiz updated successfully",
      quiz: {
        _id: quiz._id.toString(),
        title: quiz.title,
        description: quiz.description,
        questionsCount: quiz.questions?.length || 0,
      },
    });
  } catch (error) {
    console.error("Error updating quiz:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update quiz" },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete quiz (Admin only - requires authentication)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    await dbConnect();

    const { id } = await params; // ← Await params

    // Delete quiz - ensure it belongs to the admin
    const quiz = await QuizModel.findOneAndDelete({
      _id: id,
      createdBy: session.user._id, // Ensure ownership
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found or you don't have permission to delete it" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Quiz deleted successfully",
      deletedQuiz: {
        id: quiz._id.toString(),
        title: quiz.title,
      },
    });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json(
      { error: "Failed to delete quiz" },
      { status: 500 }
    );
  }
}
