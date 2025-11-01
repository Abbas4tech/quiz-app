"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { useQuizData } from "../hooks/useQuizData";
import { useQuizActions } from "../hooks/useQuizActions";
import { useQuiz } from "../context/QuizContext";
import { getScoreGrade, getAnswerStatus } from "../utils/quiz";

export default function QuizResults(): React.JSX.Element {
  const router = useRouter();
  const { quiz } = useQuiz();
  const { score, correctAnswersCount, totalQuestions, answers } = useQuizData();
  const { resetQuiz } = useQuizActions();

  const questions = quiz.questions || [];
  const { message, colorClass } = getScoreGrade(score);

  return (
    <div className="space-y-6">
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto">
            <div
              className={`flex h-36 w-36 items-center justify-center rounded-full text-5xl font-bold border-8 ${colorClass}`}
            >
              {score}%
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-primary-slate-900">
              {message}
            </CardTitle>
            <p className="text-slate-400 text-lg">
              You scored {correctAnswersCount} out of {totalQuestions} questions
              correctly
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-green-600">
                  {correctAnswersCount}
                </p>
                <p className="text-sm text-green-700 font-medium mt-1">
                  Correct
                </p>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-red-600">
                  {totalQuestions - correctAnswersCount}
                </p>
                <p className="text-sm text-red-700 font-medium mt-1">
                  Incorrect
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-blue-600">{score}%</p>
                <p className="text-sm text-blue-700 font-medium mt-1">Score</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Detailed Results */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-slate-400 text-lg">
                Answer Review
              </h3>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const { wasAnswered, isCorrect, borderColor, bgColor, icon } =
                  getAnswerStatus(userAnswer, question.correctAnswer);

                return (
                  <Card
                    key={index}
                    className={`border-l-4 ${borderColor} ${bgColor}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        {icon === "correct" && (
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                        )}
                        {icon === "incorrect" && (
                          <XCircle className="h-5 w-5 flex-shrink-0 text-red-600 mt-0.5" />
                        )}
                        {icon === "not-answered" && (
                          <AlertCircle className="h-5 w-5 flex-shrink-0 text-slate-400 mt-0.5" />
                        )}
                        <div className="flex-1 space-y-2">
                          <p className="font-semibold text-slate-900">
                            {index + 1}. {question.questionText}
                          </p>
                          {wasAnswered ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    isCorrect ? "default" : "destructive"
                                  }
                                  className="mt-0.5"
                                >
                                  Your answer
                                </Badge>
                                <p
                                  className={`text-sm font-medium ${
                                    isCorrect
                                      ? "text-green-700"
                                      : "text-red-700"
                                  }`}
                                >
                                  {userAnswer}
                                </p>
                              </div>
                              {!isCorrect && (
                                <div className="flex items-start gap-2">
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-300 mt-0.5"
                                  >
                                    Correct answer
                                  </Badge>
                                  <p className="text-sm font-medium text-green-700">
                                    {question.correctAnswer}
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-100">
                              Not answered
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/quizzes")}
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Quizzes
            </Button>
            <Button onClick={resetQuiz} className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
