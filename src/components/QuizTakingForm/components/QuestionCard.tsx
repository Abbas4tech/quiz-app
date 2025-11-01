"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import { useQuizData } from "../hooks/useQuizData";
import { useQuizActions } from "../hooks/useQuizActions";
import { getOptionLabel } from "../utils/quiz";

export default function QuestionCard(): React.JSX.Element | null {
  const { currentQuestion, currentQuestionIndex, answers } = useQuizData();
  const { selectAnswer } = useQuizActions();

  if (!currentQuestion) {
    return null;
  }

  return (
    <Card className="border-2">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl leading-relaxed flex-1">
            {currentQuestion.questionText}
          </CardTitle>
          <Badge className="flex-shrink-0">Q{currentQuestionIndex + 1}</Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <RadioGroup
          value={answers[currentQuestionIndex] || ""}
          onValueChange={selectAnswer}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, idx) => (
            <div
              key={idx}
              className={`relative flex items-start space-x-3 rounded-lg border-2 p-4 transition-all cursor-pointer ${
                answers[currentQuestionIndex] === option
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-accent"
              }`}
            >
              <RadioGroupItem
                value={option}
                id={`option-${idx}`}
                className="mt-0.5"
              />
              <Label
                htmlFor={`option-${idx}`}
                className="flex-1 cursor-pointer text-base font-normal leading-relaxed"
              >
                <span className="font-semibold text-primary mr-2">
                  {getOptionLabel(idx)}.
                </span>
                <span>{option}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
