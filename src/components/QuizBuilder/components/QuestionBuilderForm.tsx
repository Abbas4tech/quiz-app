"use client";

import React from "react";
import { toast } from "sonner";
import { Plus, Trash2, CheckCircle2, HelpCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { useQuestionBuilder } from "../hooks/useQuestionBuilder";
import { getValidOptions, isQuestionValid } from "../utils/quizBuilder";

export function QuestionBuilderForm(): React.JSX.Element {
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
      toast.error("Please fill all required fields");
    } else {
      toast.success("Question added successfully");
    }
  };

  return (
    <Card className="border-2 border-dashed border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Add New Question
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question Text */}
        <div>
          <FormLabel>Question Text *</FormLabel>
          <Input
            placeholder="Type your question here..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="text-base mt-2"
          />
        </div>

        {/* Answer Options */}
        <div>
          <FormLabel>Answer Options * (minimum 2)</FormLabel>
          <div className="space-y-2 mt-2">
            {options.map((value, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="w-8 h-10 flex items-center justify-center rounded border bg-muted text-sm font-medium">
                  {String.fromCharCode(65 + idx)}
                </div>
                <Input
                  placeholder={`Option ${idx + 1}`}
                  value={value}
                  onChange={(e) => setOption(idx, e.target.value)}
                  className="text-base flex-1"
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(idx)}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {options.length < 6 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              onClick={addOption}
            >
              <Plus className="h-4 w-4" />
              Add More Options
            </Button>
          )}
        </div>

        {/* Correct Answer */}
        {validOptions.length > 1 && (
          <>
            <Separator />
            <div>
              <FormLabel className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Select Correct Answer *
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
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                          correctAnswer === opt
                            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                            : "hover:bg-accent border-border"
                        }`}
                        key={idx}
                        onClick={() => setCorrectAnswer(opt)}
                      >
                        <RadioGroupItem value={opt} id={`opt-${idx}`} />
                        <label
                          htmlFor={`opt-${idx}`}
                          className="flex-1 cursor-pointer text-sm font-medium"
                        >
                          <span className="inline-block w-6 h-6 rounded-full border text-center text-xs leading-6 mr-2 bg-muted">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                        </label>
                        {correctAnswer === opt && (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    )
                )}
              </RadioGroup>
            </div>
          </>
        )}

        <Separator />

        {/* Add Question Button */}
        <Button
          type="button"
          className="w-full"
          size="lg"
          onClick={handleAddQuestion}
          disabled={!canAddQuestion}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Question to Quiz
        </Button>

        {!canAddQuestion && validOptions.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            {!questionText.trim() && "Enter a question text"}
            {questionText.trim() &&
              validOptions.length < 2 &&
              "Add at least 2 options"}
            {questionText.trim() &&
              validOptions.length >= 2 &&
              !correctAnswer &&
              "Select correct answer"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
