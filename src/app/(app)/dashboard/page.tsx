import React from "react";
import { getServerSession } from "next-auth";
import { unauthorized } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDashboardData } from "@/actions/dashboard";
import { DashboardOverview } from "@/components/DashboardOverview";
import QuizCard from "@/components/QuizListing/components/QuizCard";
import { authOptions } from "@/app/api/auth/options";

export default async function DashboardPage(): Promise<React.ReactNode> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    unauthorized();
  }

  const [dashboardData] = await Promise.all([getDashboardData(session)]);

  return (
    <main className="container px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Welcome back, {dashboardData.user.name}! 👋
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Here&lsquo;s your quiz dashboard. Manage your quizzes and track your
            progress.
          </p>
        </div>
      </div>

      {/* Dashboard Overview Section */}
      <section className="mb-12">
        <DashboardOverview
          stats={dashboardData.stats}
          user={dashboardData.user}
        />
      </section>

      {/* Recently Modified Quizzes Section */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Recently Modified Quizzes
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Your last updated quizzes
          </p>
        </div>

        {dashboardData.recentlyQuizzes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboardData.recentlyQuizzes.map((quiz) => (
              <QuizCard
                permissions={dashboardData.user.permissions}
                key={quiz._id.toString()}
                quiz={quiz}
                isViewOnly
              />
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No quizzes modified yet
              </p>
              <Button asChild>
                <a href="/create">Create Your First Quiz</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}

// Enable ISR revalidation
export const revalidate = 300; // Revalidate every 5 minutes
