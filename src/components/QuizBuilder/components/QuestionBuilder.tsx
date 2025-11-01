"use client";

import React from "react";
import { toast } from "sonner";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { useQuestionBuilder } from "../hooks/useQuestionBuilder";
import { getValidOptions, isQuestionValid } from "../utils/quizBuilder";

export default function QuestionBuilder(): React.JSX.Element {
  const {
    questionText,
    options,
    correctAnswer,
    setQuestionText,
    setOption,
    addOption,
    removeOption,
    setCorrectAnswer,
    addQuestion,
  } = useQuestionBuilder();

  const validOptions = getValidOptions(options);
  const canAddQuestion = isQuestionValid(questionText, options, correctAnswer);

  const handleAddQuestion = (): void => {
    const success = addQuestion();
    if (!success) {
      toast.error("Please fill all required fields correctly");
    } else {
      toast.success("Question added successfully");
    }
  };

  return (
    <Card className="border-2 border-dashed">
      <CardHeader>
        <CardTitle className="text-xl">Add New Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question Text Input */}
        <div>
          <FormLabel>Question Text</FormLabel>
          <Input
            placeholder="Enter your question..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="text-base mt-2"
          />
        </div>

        {/* Answer Options */}
        <div>
          <FormLabel>Answer Options</FormLabel>
          <div className="space-y-2 mt-2">
            {options.map((value, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  placeholder={`Option ${idx + 1}`}
                  value={value}
                  onChange={(e) => setOption(idx, e.target.value)}
                  className="text-base"
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(idx)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={addOption}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>

        {/* Correct Answer Selection */}
        {validOptions.length > 1 && (
          <div>
            <FormLabel className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Select Correct Answer
            </FormLabel>
            <RadioGroup
              value={correctAnswer}
              onValueChange={setCorrectAnswer}
              className="mt-3 space-y-2"
            >
              {options.map(
                (opt, idx) =>
                  opt && (
                    <div
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                        correctAnswer === opt
                          ? "border-primary bg-primary/5"
                          : "hover:bg-accent"
                      }`}
                      key={idx}
                    >
                      <RadioGroupItem value={opt} id={`correct${idx}`} />
                      <label
                        htmlFor={`correct${idx}`}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {opt}
                      </label>
                    </div>
                  )
              )}
            </RadioGroup>
          </div>
        )}

        <Separator />

        {/* Add Question Button */}
        <Button
          type="button"
          className="w-full"
          onClick={handleAddQuestion}
          disabled={!canAddQuestion}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question to Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
