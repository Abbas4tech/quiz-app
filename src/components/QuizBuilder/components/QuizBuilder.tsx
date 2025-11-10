"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Loader2 } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { QuizForm, quizSchema } from "@/schemas/quiz";

import {
  QuizBuilderProvider,
  useQuizBuilder,
} from "../context/QuizBuilderContext";
import { useQuizBuilderSubmit } from "../hooks/useQuizBuilderSubmit";
import { QuizDetailsForm } from "./QuizDetailsForm";
import { QuestionBuilderForm } from "./QuestionBuilderForm";
import { QuizLivePreview } from "./QuizLivePreview";

interface QuizBuilderProps {
  mode: "create" | "edit";
  quizId?: string;
  initialData?: QuizForm;
}

function QuizBuilderContent(): React.JSX.Element {
  const { submitQuiz } = useQuizBuilderSubmit();
  const { form } = useQuizBuilder();
  const { isSubmitting, isValid, isDirty } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitQuiz)}
        className="h-full flex flex-col"
      >
        {/* Fixed Header with Actions */}
        <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {form.getValues("title") || "Untitled Quiz"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {form.watch("questions")?.length || 0} questions added
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!(isValid && isDirty) || isSubmitting}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Quiz
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Split View Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side - Form */}
          <div className="w-1/2 overflow-y-auto border-r">
            <div className="p-6 space-y-6">
              {/* Quiz Details */}
              <QuizDetailsForm />

              {/* Question Builder */}
              <QuestionBuilderForm />
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className="w-1/2 overflow-y-auto bg-slate-50 dark:bg-slate-900/20">
            <div className="p-6">
              <QuizLivePreview />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export function QuizBuilder({
  mode,
  quizId,
  initialData,
}: QuizBuilderProps): React.JSX.Element {
  const form = useForm<QuizForm>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      questions: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <div className="h-screen flex flex-col">
      <QuizBuilderProvider form={form} mode={mode} quizId={quizId}>
        <QuizBuilderContent />
      </QuizBuilderProvider>
    </div>
  );
}
