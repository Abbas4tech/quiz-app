"use client";

import React, { useCallback, useState } from "react";
import { Trash2, PenBoxIcon, Play } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteQuiz } from "@/actions/quiz";
import { PERMISSIONS } from "@/types/permissions";

import { useQuizListing } from "../context/QuizListingContext";

export default function QuizTable(): React.JSX.Element {
  const { paginatedQuizzes, config } = useQuizListing();

  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = useCallback(async (quizId: string): Promise<void> => {
    // eslint-disable-next-line no-alert
    if (!window.confirm("Are you sure you want to delete this quiz?")) {
      return;
    }

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

  const getDifficultyBadge = (questionCount: number): React.JSX.Element => {
    if (questionCount > 20) {
      return (
        <Badge className="bg-red-100 text-red-800 border border-red-300">
          Hard
        </Badge>
      );
    }
    if (questionCount > 15) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
          Medium
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-800 border border-blue-300">
        Easy
      </Badge>
    );
  };

  const formatDate = (dateString: Date): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Questions</TableHead>
            <TableHead className="font-semibold">Difficulty</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedQuizzes.map((quiz) => {
            const quizId = quiz._id.toString();
            const isDeleting = deletingIds.has(quizId);

            if (isDeleting) {
              return (
                <TableRow
                  key={quizId}
                  className="hover:bg-transparent opacity-50"
                >
                  <TableCell className="py-4">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-3 w-64" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-12 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-16" />
                    </div>
                  </TableCell>
                </TableRow>
              );
            }

            // Normal row
            return (
              <TableRow key={quizId} className="transition-colors">
                <TableCell className="">
                  <div className="max-w-xs">
                    <p className="font-bold truncate">{quiz.title}</p>
                    <p className="text-sm truncate">
                      {quiz.description || "No description"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="neutral" className="font-mono">
                    {quiz.questions?.length || 0}
                  </Badge>
                </TableCell>
                <TableCell>
                  {getDifficultyBadge(quiz.questions?.length || 0)}
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(quiz.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {config?.permissions?.includes(PERMISSIONS._UPDATE) && (
                      <Button
                        variant="neutral"
                        asChild
                        size={"icon"}
                        title="Edit Quiz"
                        className="gap-1.5"
                      >
                        <Link href={`${config.editBasePath}/${quizId}`}>
                          <PenBoxIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {config?.permissions?.includes(PERMISSIONS._DELETE) && (
                      <Button
                        size="icon"
                        variant="neutral"
                        onClick={() => handleDelete(quizId)}
                        disabled={isDeleting}
                        title="Delete Quiz"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    {!config?.permissions?.length && (
                      <Button
                        asChild
                        variant="neutral"
                        title={"Start Quiz"}
                        className="gap-1.5"
                      >
                        <Link href={`${config.playBasePath}/${quizId}`}>
                          Start Quiz
                          <Play className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
