"use client";
import React from "react";
import Link from "next/link";
import { Clock, CheckCircle2, ArrowRight, Brain } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlainQuiz } from "@/actions/quiz";

export default function QuizCard({
  quiz,
}: {
  quiz: PlainQuiz;
}): React.JSX.Element {
  const questionCount = quiz.questions?.length || 0;
  const estimatedTime = Math.max(1, Math.ceil(questionCount * 1.5)); // ~1.5 mins per question

  // Determine difficulty based on question count
  const difficulty =
    questionCount > 15 ? "Hard" : questionCount > 8 ? "Medium" : "Easy";
  const difficultyColor =
    difficulty === "Hard"
      ? "bg-red-100 text-red-700 border-red-200"
      : difficulty === "Medium"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-green-100 text-green-700 border-green-200";

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-2 hover:border-primary/50">
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

        {/* Action Button */}
        <Button asChild className="w-full group/btn shadow-md">
          <Link href={`/quizzes/${quiz._id}`}>
            <span className="flex items-center justify-center gap-2">
              Start Quiz
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
