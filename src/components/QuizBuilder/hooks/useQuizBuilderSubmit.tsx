"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";

import { QuizForm } from "@/schemas/quiz";

import { useQuizBuilder } from "../context/QuizBuilderContext";

interface useQuizBuilderSubmitReturn {
  submitQuiz: SubmitHandler<QuizForm>;
}

export function useQuizBuilderSubmit(): useQuizBuilderSubmitReturn {
  const router = useRouter();
  const { mode, quizId } = useQuizBuilder();

  const submitQuiz = useCallback(
    async (data: QuizForm) => {
      try {
        const url =
          mode === "create" || !quizId ? "/api/quiz" : `/api/quiz/${quizId}`;
        const method = mode === "create" ? "POST" : "PUT";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to save quiz");
        }

        const result: {
          message: string;
          quiz: { questionsCount: number; title: string; _id: string };
        } = await response.json();

        if (result.message) {
          toast.success(result.message);
        }

        router.push(`/dashboard/quiz/${result.quiz._id}`);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to save quiz. Please try again.");
      } finally {
      }
    },
    [mode, quizId, router]
  );

  return {
    submitQuiz,
  };
}
