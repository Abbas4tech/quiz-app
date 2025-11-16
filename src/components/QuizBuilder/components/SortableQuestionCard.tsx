"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, CheckCircle2, Edit2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Question } from "@/schemas/quiz";

import { useQuizBuilder } from "../context/QuizBuilderContext";
import { getOptionLabel, getValidOptions } from "../utils/quizBuilder";
import { QuestionForm } from ".";

interface SortableQuestionCardProps {
  id: string;
  question: Question;
  index: number;
  onRemove: () => void;
  onUpdate: (_updatedQuestion: Question) => void;
}

export default function SortableQuestionCard({
  id,
  question,
  index,
  onRemove,
  onUpdate,
}: SortableQuestionCardProps): React.JSX.Element {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const { state, dispatch } = useQuizBuilder();
  const editingQuestion = state.editingQuestion.question;
  const isEditing =
    state.editingQuestion.isEditing &&
    state.editingQuestion.index === index &&
    editingQuestion;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleStartEdit = (): void => {
    dispatch({
      type: "START_EDITING",
      payload: { index, question },
    });
  };

  const handleCancelEdit = (): void => {
    dispatch({ type: "STOP_EDITING" });
  };

  const handleSaveEdit = (): void => {
    if (!editingQuestion) {
      return;
    }

    const validOptions = getValidOptions(editingQuestion.options);
    if (
      !editingQuestion.questionText.trim() ||
      validOptions.length < 2 ||
      !editingQuestion.correctAnswer ||
      !validOptions.includes(editingQuestion.correctAnswer)
    ) {
      return;
    }

    onUpdate({
      ...editingQuestion,
      options: validOptions,
    });
    dispatch({ type: "STOP_EDITING" });
  };

  const isValid =
    editingQuestion &&
    editingQuestion.questionText.trim() &&
    getValidOptions(editingQuestion.options).length >= 2 &&
    editingQuestion.correctAnswer &&
    getValidOptions(editingQuestion.options).includes(
      editingQuestion.correctAnswer
    );

  if (!isEditing) {
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
              {/* Question Text & Actions */}
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm">
                  <span className="text-primary mr-2">{index + 1}.</span>
                  {question.questionText}
                </p>
                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                    onClick={handleStartEdit}
                    title="Edit question"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                    }}
                    title="Delete question"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2">
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

  if (isEditing) {
    return (
      <div ref={setNodeRef} style={style}>
        <div className="space-y-3 p-6 rounded-lg border-2 border-primary/50 bg-blue-50 dark:bg-blue-950/20">
          {/* Header with close button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit2 className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-sm">
                Editing Question {index + 1}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleCancelEdit}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <QuestionForm
            mode="edit"
            questionText={editingQuestion.questionText}
            options={editingQuestion.options}
            correctAnswer={editingQuestion.correctAnswer}
            onQuestionTextChange={(text) =>
              dispatch({
                type: "UPDATE_EDITING_QUESTION_TEXT",
                payload: text,
              })
            }
            onOptionChange={(idx, value) =>
              dispatch({
                type: "UPDATE_EDITING_OPTION",
                payload: { index: idx, value },
              })
            }
            onAddOption={() => dispatch({ type: "ADD_EDITING_OPTION" })}
            onRemoveOption={(idx) =>
              dispatch({
                type: "REMOVE_EDITING_OPTION",
                payload: idx,
              })
            }
            onCorrectAnswerChange={(answer) =>
              dispatch({
                type: "UPDATE_EDITING_CORRECT_ANSWER",
                payload: answer,
              })
            }
            onPrimaryAction={handleSaveEdit}
            isPrimaryActionDisabled={!isValid}
            primaryActionLabel="Save Changes"
            onSecondaryAction={handleCancelEdit}
            secondaryActionLabel="Cancel"
            title=""
            description=""
          />
        </div>
      </div>
    );
  }

  return <span className="sr-only">SortableQuestionCard Component</span>;
}
