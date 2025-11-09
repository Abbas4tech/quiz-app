"use client";

import React, { useCallback, useState } from "react";
import {
  Trash2,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  PenBoxIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteQuiz } from "@/actions/quiz";

import { useQuizListing } from "../context/QuizListingContext";

export function QuizGrid(): React.JSX.Element {
  const { paginatedQuizzes, config } = useQuizListing();

  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = useCallback(async (quizId: string): Promise<void> => {
    setDeletingIds((prev) => new Set(prev).add(quizId.toString()));

    try {
      await deleteQuiz(quizId);
      toast.success("Quiz deleted successfully");

      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");

      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(quizId.toString());
        return newSet;
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedQuizzes.map((quiz) => {
        const quizId = quiz._id.toString();
        const isDeleting = deletingIds.has(quizId);

        if (isDeleting) {
          return (
            <Card
              key={quizId}
              className="group relative overflow-hidden transition-all duration-300 border-2"
            >
              <CardHeader className="relative pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="rounded-full h-12 w-12" />
                </div>
              </CardHeader>

              <CardContent className="relative space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>

                {config.isPrivate ? (
                  <div className="flex w-full items-center gap-2">
                    <Skeleton className="flex-1 h-10" />
                    <Skeleton className="flex-1 h-10" />
                  </div>
                ) : (
                  <Skeleton className="w-full h-10" />
                )}
              </CardContent>
            </Card>
          );
        }

        // Normal card (not deleting)
        const questionCount = quiz.questions?.length || 0;
        const estimatedTime = Math.max(1, Math.ceil(questionCount * 1.5));

        const difficulty =
          questionCount > 15 ? "Hard" : questionCount > 8 ? "Medium" : "Easy";
        const difficultyColor =
          difficulty === "Hard"
            ? "bg-red-100 text-red-700 border-red-200"
            : difficulty === "Medium"
            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
            : "bg-green-100 text-green-700 border-green-200";

        return (
          <Card
            key={quizId}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 hover:border-primary/50"
          >
            <div className="absolute inset-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="relative pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {quiz.description || "Test your knowledge with this quiz"}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative space-y-4">
              {/* Metadata */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {questionCount} Questions
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />~{estimatedTime} min
                </Badge>
                <Badge className={difficultyColor}>{difficulty}</Badge>
              </div>

              {config.isPrivate ? (
                <div className="flex w-full items-center gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 items-center"
                  >
                    <Link
                      className="flex"
                      href={`${config.editBasePath}/${quizId}`}
                    >
                      <PenBoxIcon className="h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(quizId)}
                    disabled={isDeleting}
                    className="flex-1 items-center w-full"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              ) : (
                <Button asChild className="w-full group/btn shadow-md">
                  <Link href={`${config.playBasePath}/${quizId}`}>
                    <span className="flex items-center justify-center gap-2">
                      {config.isPrivate ? "Preview Quiz" : "Start Quiz"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
