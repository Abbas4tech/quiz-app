"use client";

import React from "react";
import { Trash2, PenBoxIcon, Play } from "lucide-react";
import Link from "next/link";

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
import { deleteQuiz } from "@/actions/quiz";

import { useQuizListing } from "../context/QuizListingContext";

export function QuizTable(): React.JSX.Element {
  const { paginatedQuizzes, config } = useQuizListing();

  const handleDelete = async (quizId: string): Promise<void> => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz(quizId);
    }
  };

  const getDifficultyBadge = (questionCount: number): React.JSX.Element => {
    if (questionCount > 20) {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Hard</Badge>
      );
    }
    if (questionCount > 15) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Medium
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
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
    <div className="rounded-lg border overflow-hidden">
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
          {paginatedQuizzes.map((quiz) => (
            <TableRow key={quiz._id}>
              <TableCell>
                <div className="space-y-1 max-w-xs">
                  <p className="font-bold truncate">{quiz.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {quiz.description || "No description"}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono">
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
                  {config.isPrivate ? (
                    <>
                      <Button variant="outline" asChild title="Edit Quiz">
                        <Link href={`${config.editBasePath}/${quiz._id}`}>
                          Edit
                          <PenBoxIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(quiz._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete Quiz"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      asChild
                      variant="default"
                      className=""
                      title={config.isPrivate ? "Preview Quiz" : "Start Quiz"}
                    >
                      <Link href={`${config.playBasePath}/${quiz._id}`}>
                        Start Quiz
                        <Play className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
