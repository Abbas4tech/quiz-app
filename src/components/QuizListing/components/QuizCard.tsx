import React from "react";
import {
  Trash2,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  PenBoxIcon,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Permissions, PERMISSIONS } from "@/types/permissions";
import { Quiz } from "@/model/Quiz";
import { Skeleton } from "@/components/ui/skeleton";

interface QuizCardProps {
  permissions?: Permissions;
  quiz: Quiz;
  isDeleting?: boolean;
  onDelete?: (_id: string) => void;
  isViewOnly?: boolean;
}

const QuizCard = ({
  quiz,
  isDeleting = false,
  permissions,
  onDelete,
  isViewOnly = false,
}: QuizCardProps): React.JSX.Element => {
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

  if (isDeleting) {
    return (
      <Card className="group relative overflow-hidden transition-all duration-300 border-2">
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

          {permissions?.length ? (
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

  return (
    <Card className="group relative overflow-hidden bg-secondary-background transition-all duration-300 hover:scale-[1.01]">
      <div className="absolute inset-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
              {quiz.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {quiz.description || "Test your knowledge with this quiz"}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="rounded-full bg-main-foreground/10 p-3 group-hover:bg-main-foreground/20 transition-colors">
              <Brain className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </CardHeader>

      {!isViewOnly && (
        <CardContent className="relative space-y-4">
          {/* Metadata */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {questionCount} Questions
            </Badge>
            <Badge variant="neutral" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />~{estimatedTime} min
            </Badge>
            <Badge className={difficultyColor}>{difficulty}</Badge>
          </div>

          <div className="flex w-full items-center gap-2">
            {permissions?.includes(PERMISSIONS._UPDATE) && (
              <Button asChild variant="reverse" className="flex-1 items-center">
                <Link
                  className="flex"
                  href={`/dashboard/quiz/${quiz._id.toString()}`}
                >
                  <PenBoxIcon className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
            )}
            {permissions?.includes(PERMISSIONS._DELETE) && (
              <Button
                variant="reverse"
                onClick={onDelete && onDelete.bind(null, quiz._id.toString())}
                disabled={isDeleting}
                className="flex-1 items-center w-full"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>

          {!permissions?.length && (
            <Button asChild className="w-full group/btn shadow-md">
              <Link href={`/quizzes/${quiz._id.toString()}`}>
                <span className="flex items-center justify-center gap-2">
                  Start Quiz
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </Link>
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default QuizCard;
