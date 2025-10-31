import React from "react";
import { BookOpen, Users, Brain } from "lucide-react";

import { getPublicQuizzes } from "@/actions/quiz";
import QuizCard from "@/components/QuizCard";
import { Card, CardContent } from "@/components/ui/card";

export default async function QuizzesPage(): Promise<React.JSX.Element> {
  const quizzes = await getPublicQuizzes(100);

  const totalQuestions = quizzes.reduce(
    (acc, q) => acc + (q.questions?.length || 0),
    0
  );

  return (
    <div className="bg-gradient-to-br">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 overflow-hidden bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">
                    Available Quizzes
                  </p>
                  <p className="mt-2 text-4xl font-bold">{quizzes.length}</p>
                  <p className="mt-1 text-xs opacity-75">Ready to take</p>
                </div>
                <div className="rounded-full bg-white/20 p-4">
                  <BookOpen className="h-10 w-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 overflow-hidden bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">
                    Total Questions
                  </p>
                  <p className="mt-2 text-4xl font-bold">{totalQuestions}</p>
                  <p className="mt-1 text-xs opacity-75">Test your knowledge</p>
                </div>
                <div className="rounded-full bg-white/20 p-4">
                  <Brain className="h-10 w-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 overflow-hidden bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">
                    Active Learners
                  </p>
                  <p className="mt-2 text-4xl font-bold">1.2K+</p>
                  <p className="mt-1 text-xs opacity-75">Join the community</p>
                </div>
                <div className="rounded-full bg-white/20 p-4">
                  <Users className="h-10 w-10" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Grid */}
        {quizzes.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">
                Choose Your Quiz
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz._id} quiz={quiz} />
              ))}
            </div>
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
