"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";

import { QuizForm } from "@/schemas/quiz";
import { createQuiz, updateQuiz } from "@/actions/quiz";

import { useQuizBuilder } from "../context/QuizBuilderContext";

interface useQuizBuilderSubmitReturn {
  submitQuiz: SubmitHandler<QuizForm>;
}

export function useQuizBuilderSubmit(): useQuizBuilderSubmitReturn {
  const router = useRouter();
  const { mode, quizId } = useQuizBuilder();

  const submitQuiz: SubmitHandler<QuizForm> = useCallback(
    async (data) => {
      try {
        const result =
          mode === "create" || !quizId
            ? await createQuiz(data)
            : await updateQuiz(quizId, data);

        if (result.message) {
          toast.success(result.message);
        }

        router.push(`/dashboard/quiz/${result.data._id}`);
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
        toast.error("Failed to save quiz. Please try again.");
      }
    },
    [mode, quizId, router]
  );

  return {
    submitQuiz,
  };
}
