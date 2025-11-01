"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useQuizData } from "../hooks/useQuizData";
import { useQuizActions } from "../hooks/useQuizActions";

export default function QuestionNavigator(): React.JSX.Element {
  const { totalQuestions, currentQuestionIndex, answers } = useQuizData();
  const { goToQuestion } = useQuizActions();

  const questions = Array.from({ length: totalQuestions }, (_, i) => i);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary flex items-center gap-2">
          Quick Navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {questions.map((idx) => (
            <Button
              key={idx}
              onClick={() => goToQuestion(idx)}
              variant={idx === currentQuestionIndex ? "default" : "outline"}
              size="icon"
              className={`h-10 w-10 font-semibold ${
                idx === currentQuestionIndex
                  ? ""
                  : answers[idx]
                  ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100 hover:text-green-800"
                  : ""
              }`}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
