"use client";

import React from "react";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { getValidOptions, getOptionLabel } from "../utils/quizBuilder";

interface QuestionFormProps {
  mode: "create" | "edit";
  questionText: string;
  options: string[];
  correctAnswer: string;
  onQuestionTextChange: (_text: string) => void;
  onOptionChange: (_index: number, _value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (_index: number) => void;
  onCorrectAnswerChange: (_answer: string) => void;
  onPrimaryAction: () => void;
  isPrimaryActionDisabled: boolean;
  primaryActionLabel: string;
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  title?: string;
  description?: string;
}

export default function QuestionForm({
  mode,
  questionText,
  options,
  correctAnswer,
  onQuestionTextChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onCorrectAnswerChange,
  onPrimaryAction,
  isPrimaryActionDisabled,
  primaryActionLabel,
  onSecondaryAction,
  secondaryActionLabel,
  title,
  description,
}: QuestionFormProps): React.JSX.Element {
  const validOptions = getValidOptions(options);
  const maxOptionsReached = options.length >= 6;
  const minOptionsReached = options.length <= 2;

  const content = (
    <>
      <div>
        <FormLabel>Question Text *</FormLabel>
        <Input
          placeholder="Type your question here..."
          value={questionText}
          onChange={(e) => onQuestionTextChange(e.target.value)}
          className="text-base mt-2"
        />
      </div>

      {/* Answer Options */}
      <div>
        <FormLabel>Answer Options * (minimum 2, maximum 6)</FormLabel>
        <div className="space-y-2 mt-2">
          {options.map((value, idx) => (
            <div key={idx} className="flex gap-2">
              <div className="w-8 h-10 flex items-center justify-center rounded border bg-muted text-sm font-medium flex-shrink-0">
                {getOptionLabel(idx)}
              </div>
              <Input
                placeholder={`Option ${idx + 1}`}
                value={value}
                onChange={(e) => onOptionChange(idx, e.target.value)}
                className="text-sm flex-1"
              />
              {!minOptionsReached && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveOption(idx)}
                  className="h-10 w-10 hover:bg-red-50 hover:text-red-600 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {!maxOptionsReached && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={onAddOption}
          >
            <Plus className="h-4 w-4" />
            Add Option
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
              onValueChange={onCorrectAnswerChange}
              className="mt-3 space-y-2"
            >
              {options.map(
                (opt, idx) =>
                  opt.trim() && (
                    <div
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        correctAnswer === opt
                          ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                          : "hover:bg-accent border-border"
                      }`}
                      key={idx}
                    >
                      <RadioGroupItem value={opt} id={`option-${idx}`} />
                      <label
                        htmlFor={`option-${idx}`}
                        className="flex-1 cursor-pointer text-sm font-medium"
                      >
                        <span className="inline-block w-6 h-6 rounded-full border text-center text-xs leading-6 mr-2 bg-muted">
                          {getOptionLabel(idx)}
                        </span>
                        {opt}
                      </label>
                      {correctAnswer === opt && (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  )
              )}
            </RadioGroup>
          </div>
        </>
      )}

      <Separator />

      {/* Action Buttons */}
      <div className="flex gap-2">
        {mode === "edit" && onSecondaryAction && secondaryActionLabel && (
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onSecondaryAction}
          >
            {secondaryActionLabel}
          </Button>
        )}
        <Button
          type="button"
          className={mode === "create" ? "w-full" : "flex-1"}
          onClick={onPrimaryAction}
          disabled={isPrimaryActionDisabled}
        >
          <Plus className="h-4 w-4 mr-2" />
          {primaryActionLabel}
        </Button>
      </div>

      {/* Validation Message */}
      {isPrimaryActionDisabled && validOptions.length > 0 ? (
        <p className="text-xs text-muted-foreground text-center">
          {!questionText.trim() && "Enter a question text • "}
          {questionText.trim() &&
            validOptions.length < 2 &&
            "Add at least 2 options • "}
          {questionText.trim() &&
            validOptions.length >= 2 &&
            !correctAnswer &&
            "Select correct answer"}
        </p>
      ) : null}
    </>
  );

  // Create mode: wrap in Card
  if (mode === "create") {
    return (
      <Card className="border-2 border-dashed border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ➕ {title || "Add New Question"}
          </CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">{content}</CardContent>
      </Card>
    );
  }

  // Edit mode: no Card wrapper, just content
  return <div className="space-y-4">{content}</div>;
}
