"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Eye, ListOrdered } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useQuizBuilder } from "../context/QuizBuilderContext";
import { SortableQuestionCard } from ".";
import { useQuestionBuilder } from "../hooks/useQuestionBuilder";

export default function QuizLivePreview(): React.JSX.Element {
  const { form } = useQuizBuilder();
  const { questions, updateQuestion, removeQuestion } = useQuestionBuilder();

  const title = form.watch("title");
  const description = form.watch("description");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex(
        (q, idx) => `question-${idx}` === active.id
      );
      const newIndex = questions.findIndex(
        (q, idx) => `question-${idx}` === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const newQuestions = arrayMove(questions, oldIndex, newIndex);
        form.setValue("questions", newQuestions, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <Card className="py-4 gap-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {title ? (
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              {description && (
                <p className="text-muted-foreground mt-2">{description}</p>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Your quiz title will appear here</p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Badge variant="secondary">
              {questions.length} Question{questions.length !== 1 ? "s" : ""}
            </Badge>
            {questions.length > 0 && (
              <Badge variant="outline">
                ~{Math.max(1, Math.ceil(questions.length * 1.5))} min
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Questions Preview */}
      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListOrdered className="h-5 w-5" />
              Questions ({questions.length})
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Drag to reorder • Click edit icon to modify
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <DndContext
              measuring={{
                droppable: {
                  strategy: MeasuringStrategy.Always,
                },
              }}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={questions.map((_, idx) => `question-${idx}`)}
                strategy={verticalListSortingStrategy}
              >
                {questions.map((question, idx) => (
                  <SortableQuestionCard
                    key={`question-${idx}`}
                    id={`question-${idx}`}
                    question={question}
                    index={idx}
                    onRemove={() => removeQuestion(idx)}
                    onUpdate={() => updateQuestion()}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {questions.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <div className="flex flex-col items-center gap-2">
              <ListOrdered className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No questions added yet</p>
              <p className="text-xs text-muted-foreground">
                Add your first question using the form on the left
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
