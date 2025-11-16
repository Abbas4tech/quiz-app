"use client";

import React, { useCallback, useState } from "react";
import { toast } from "sonner";

import { deleteQuiz } from "@/actions/quiz";

import { useQuizListing } from "../context/QuizListingContext";
import QuizCard from "./QuizCard";

export default function QuizGrid(): React.JSX.Element {
  const { paginatedQuizzes, config } = useQuizListing();

  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = useCallback(async (quizId: string): Promise<void> => {
    setDeletingIds((prev) => new Set(prev).add(quizId.toString()));

    try {
      await deleteQuiz(quizId);
      toast.success("Quiz deleted successfully");

      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");

      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(quizId.toString());
        return newSet;
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedQuizzes.map((quiz) => {
        const quizId = quiz._id.toString();
        const isDeleting = deletingIds.has(quizId);

        return (
          <QuizCard
            permissions={config?.permissions}
            isDeleting={isDeleting}
            onDelete={(id) => handleDelete(id)}
            key={quiz._id.toString()}
            quiz={quiz}
          />
        );
      })}
    </div>
  );
}
