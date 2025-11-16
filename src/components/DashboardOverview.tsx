import React, { ReactNode } from "react";
import { BookOpen, FileText, Trophy, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import AuthButton from "./AuthButton";

interface DashboardStats {
  totalQuizzes: number;
  totalQuestions: number;
  myQuizzes: number;
  totalAttempts?: number;
}

interface DashboardFeatureList {
  icon: ReactNode;
  title: string;
  description: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  joinedDate?: string;
}

interface DashboardOverviewProps {
  stats: DashboardStats;
  user: UserProfile;
}

const list: DashboardFeatureList[] = [
  {
    title: "Browse Quizzes",
    description: "Explore all available quizzes and test your knowledge",
    icon: (
      <div className="flex items-start justify-between mb-4">
        <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg transition-colors">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    ),
  },
];

export function DashboardOverview({
  stats,
  user,
}: DashboardOverviewProps): React.JSX.Element {
  return (
    <div className="space-y-6">
      {/* Top Section: Profile + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-2 hover:shadow-lg gap-2 transition-shadow">
          <CardContent className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg font-bold bg-primary/10">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base truncate">{user.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                  {user.email}
                </p>
                {user.role && (
                  <Badge className="mt-1 bg-primary/10 capitalize text-primary hover:bg-primary/20">
                    {user.role}
                  </Badge>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Info */}
            <div className="space-y-2 text-sm">
              {user.joinedDate && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Joined
                  </span>
                  <span className="font-medium">{user.joinedDate}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="flex-1 gap-2" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>

              <AuthButton />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {/* Total Quizzes */}
          <Card className="border-2 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-50 dark:from-blue-950/20 dark:to-blue-900/20">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Total Quizzes
                  </p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                    {stats.totalQuizzes}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">All platforms</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Questions */}
          <Card className="border-2 hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-50 dark:from-purple-950/20 dark:to-purple-900/20">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Total Questions
                  </p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                    {stats.totalQuestions}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Across all quizzes
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Quizzes */}
          <Card className="border-2 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-50 dark:from-green-950/20 dark:to-green-900/20">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    My Quizzes
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                    {stats.myQuizzes}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Created by you</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attempts */}
          <Card className="border-2 hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-50 to-orange-50 dark:from-orange-950/20 dark:to-orange-900/20">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Attempts
                  </p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                    {stats.totalAttempts || 0}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Quiz attempts</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/40 p-3 rounded-lg">
                  <Trophy className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section: Feature Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Explore Features</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Checkout our all exiting features of dashboard
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Browse Quizzes */}
          {list.map((i) => (
            <Card
              key={i.description}
              className="border-2 hover:shadow-lg transition-all cursor-pointer group"
            >
              <CardHeader>
                <h3 className="font-bold text-base">{i.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {i.description}
                </p>
                <CardAction>{i.icon}</CardAction>
              </CardHeader>

              <CardContent>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/dashboard/quiz">Start Learning</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
