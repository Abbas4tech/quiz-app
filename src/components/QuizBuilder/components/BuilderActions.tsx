"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQuizBuilder } from "../context/QuizBuilderContext";
import { useQuizBuilderSubmit } from "../hooks/useQuizBuilderSubmit";
import { useQuestionBuilder } from "../hooks/useQuestionBuilder";

export default function BuilderActions(): React.JSX.Element {
  const router = useRouter();
  const { mode } = useQuizBuilder();
  const { isSubmitting } = useQuizBuilderSubmit();
  const { questions } = useQuestionBuilder();

  return (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => router.back()}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        size="lg"
        disabled={questions.length === 0 || isSubmitting}
        className="min-w-[150px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            {mode === "create" ? "Create Quiz" : "Update Quiz"}
          </>
        )}
      </Button>
    </div>
  );
}
