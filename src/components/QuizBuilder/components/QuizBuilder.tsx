"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { QuizForm, quizSchema } from "@/schemas/quiz";

import { BuilderActions, QuestionBuilder, QuestionPreview, QuizTitle } from ".";
import {
  QuizBuilderProvider,
  useQuizBuilder,
} from "../context/QuizBuilderContext";
import { useQuizBuilderSubmit } from "../hooks/useQuizBuilderSubmit";

interface QuizBuilderProps {
  mode: "create" | "edit";
  quizId?: string;
  initialData?: QuizForm;
}

function QuizBuilderContent(): React.JSX.Element {
  const { submitQuiz } = useQuizBuilderSubmit();
  const { form } = useQuizBuilder();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitQuiz)} className="space-y-6">
        <QuizTitle />
        <QuestionBuilder />
        <QuestionPreview />
        <BuilderActions />
      </form>
    </Form>
  );
}

export default function QuizBuilder({
  mode,
  quizId,
  initialData,
}: QuizBuilderProps): React.JSX.Element {
  const form = useForm<QuizForm>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || {
      title: "",
      questions: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <div className="md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {mode === "create" ? "Create New Quiz" : "Edit Quiz"}
          </h1>
          <p className="text-slate-600 mt-2">
            {mode === "create"
              ? "Build your MCQ quiz with multiple questions and options"
              : "Update your quiz details and questions"}
          </p>
        </div>

        <QuizBuilderProvider form={form} mode={mode} quizId={quizId}>
          <QuizBuilderContent />
        </QuizBuilderProvider>
      </div>
    </div>
  );
}
