"use client";

import React from "react";
import { Trash2, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useQuestionBuilder } from "../hooks/useQuestionBuilder";
import { getOptionLabel } from "../utils/quizBuilder";

export default function QuestionsPreview(): React.JSX.Element | null {
  const { questions, removeQuestion } = useQuestionBuilder();

  if (questions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          Questions Preview ({questions.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="font-semibold">
                {idx + 1}. {q.questionText}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(idx)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="space-y-2 ml-4">
              {q.options.map((opt, oidx) => (
                <div
                  key={oidx}
                  className={`flex items-center gap-2 text-sm ${
                    opt === q.correctAnswer && "text-green-700 font-medium"
                  }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full border text-xs">
                    {getOptionLabel(oidx)}
                  </span>
                  {opt}
                  {opt === q.correctAnswer && (
                    <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
