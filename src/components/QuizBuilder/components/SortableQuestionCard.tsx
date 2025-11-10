"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { getOptionLabel } from "../utils/quizBuilder";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface SortableQuestionCardProps {
  id: string;
  question: Question;
  index: number;
  onRemove: () => void;
}

export function SortableQuestionCard({
  id,
  question,
  index,
  onRemove,
}: SortableQuestionCardProps): React.JSX.Element {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={`p-4 ${
          isDragging ? "shadow-lg ring-2 ring-primary" : "hover:shadow-md"
        } transition-all`}
      >
        <div className="flex gap-3">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="flex-shrink-0 cursor-grab active:cursor-grabbing pt-1"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </div>

          {/* Question Content */}
          <div className="flex-1 min-w-0">
            {/* Question Text */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <p className="font-semibold text-sm">
                <span className="text-primary mr-2">{index + 1}.</span>
                {question.questionText}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0 hover:bg-red-50 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Options */}
            <div className="space-y-2 ml-4">
              {question.options.map((opt, oidx) => {
                const isCorrect = opt === question.correctAnswer;
                return (
                  <div
                    key={oidx}
                    className={`flex items-center gap-2 text-sm p-2 rounded ${
                      isCorrect
                        ? "bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-100 font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                        isCorrect
                          ? "bg-green-600 text-white"
                          : "bg-muted border"
                      }`}
                    >
                      {getOptionLabel(oidx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
