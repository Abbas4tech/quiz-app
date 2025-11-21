import React from "react";
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
  const { id } = await params;
  const quiz = await getPublicQuizById(id);

  return (
    <div className="min-h-[100dvh] bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] py-[70px] prose-h4:xl:text-2xl prose-h4:lg:text-xl prose-h4:text-lg">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/quizzes">
            <Button variant="default" size="sm">
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
}
