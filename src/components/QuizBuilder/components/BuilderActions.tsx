"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQuizBuilder } from "../context/QuizBuilderContext";

export default function BuilderActions(): React.JSX.Element {
  const router = useRouter();
  const { mode, form } = useQuizBuilder();
  const { isSubmitting, isValid, isDirty } = form.formState;

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
            {mode === "create" ? "Create Quiz" : "Update Quiz"}
          </>
        )}
      </Button>
    </div>
  );
}
