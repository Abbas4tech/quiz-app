import React from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { getPublicQuizById } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import QuizTakingForm from "@/components/QuizTakingForm/";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
  try {
    const { id } = await params;
    const quiz = await getPublicQuizById(id);

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gradient-to-br py-8">
        <div className="mx-auto max-w-3xl px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <Link href="/quizzes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quizzes
              </Button>
            </Link>
            <div className="text-right">
              <h1 className="text-2xl font-bold">{quiz.title}</h1>
              <p className="text-sm text-accent-foreground mt-1">
                {quiz.questions.length} Questions
              </p>
            </div>
          </div>

          <QuizTakingForm quiz={quiz} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
