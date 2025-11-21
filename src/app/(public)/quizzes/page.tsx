import React from "react";
import { BookOpen } from "lucide-react";

import { getPublicQuizzes } from "@/actions/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { QuizListings } from "@/components/QuizListing/components/QuizListing";
import { DashboardOverview } from "@/components/DashboardOverview";

export default async function QuizzesPage(): Promise<React.JSX.Element> {
  const quizzes = await getPublicQuizzes(100);

  const totalQuestions = quizzes.reduce(
    (acc, q) => acc + (q.questions?.length || 0),
    0
  );

  return (
    <div className="min-h-[100dvh] bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] prose-h4:xl:text-2xl prose-h4:lg:text-xl prose-h4:text-lg">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl md:space-y-6 space-y-4 p-4 md:px-4 md:py-12 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <DashboardOverview
          user={undefined}
          stats={{
            totalQuestions,
            totalQuizzes: quizzes.length,
          }}
        />

        {/* Quiz Grid */}
        {quizzes.length > 0 ? (
          <div className="space-y-6">
            {/* <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">
                Choose Your Quiz
              </h2>
            </div> */}

            <QuizListings quizzes={quizzes} config={{}} />
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="py-16 text-center">
              <BookOpen className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No quizzes available
              </h3>
              <p className="text-slate-600">Check back soon for new quizzes!</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
