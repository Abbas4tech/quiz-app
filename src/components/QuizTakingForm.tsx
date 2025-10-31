"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  questions?: Question[];
}

export default function QuizTakingForm({
  quiz,
}: {
  quiz: Quiz;
}): React.JSX.Element {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = quiz.questions || [];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectAnswer = (answer: string): void => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNext = (): void => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (): void => {
    if (answeredCount < totalQuestions) {
      const confirm = window.confirm(
        `You have only answered ${answeredCount} out of ${totalQuestions} questions. Submit anyway?`
      );
      if (!confirm) {
        return;
      }
    }
    setShowResults(true);
  };

  const handleRetake = (): void => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const correctAnswersCount = Object.entries(answers).filter(
    ([index, answer]) => answer === questions[parseInt(index)].correctAnswer
  ).length;

  const score =
    totalQuestions > 0
      ? Math.round((correctAnswersCount / totalQuestions) * 100)
      : 0;

  // Results Screen
  if (showResults) {
    return (
      <div className="space-y-6">
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto">
              <div
                className={`flex h-36 w-36 items-center justify-center rounded-full text-5xl font-bold border-8 ${
                  score >= 80
                    ? "bg-green-50 text-green-600 border-green-200"
                    : score >= 60
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : score >= 40
                    ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                    : "bg-red-50 text-red-600 border-red-200"
                }`}
              >
                {score}%
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-primary-slate-900">
                {score >= 80
                  ? "Excellent Work! 🎉"
                  : score >= 60
                  ? "Great Job! 👍"
                  : score >= 40
                  ? "Good Effort! 💪"
                  : "Keep Practicing! 📚"}
              </CardTitle>
              <p className="text-slate-400 text-lg">
                You scored {correctAnswersCount} out of {totalQuestions}{" "}
                questions correctly
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
                  <p className="text-sm text-blue-700 font-medium mt-1">
                    Score
                  </p>
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
                  const isCorrect = userAnswer === question.correctAnswer;
                  const wasAnswered = userAnswer !== undefined;

                  return (
                    <Card
                      key={index}
                      className={`border-l-4 ${
                        !wasAnswered
                          ? "border-l-slate-300 bg-slate-50"
                          : isCorrect
                          ? "border-l-green-500 bg-green-50"
                          : "border-l-red-500 bg-red-50"
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex gap-3">
                          {wasAnswered ? (
                            isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                            ) : (
                              <XCircle className="h-5 w-5 flex-shrink-0 text-red-600 mt-0.5" />
                            )
                          ) : (
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
                              <Badge
                                variant="secondary"
                                className="bg-slate-100"
                              >
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
              <Button onClick={handleRetake} className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz Taking Screen
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card>
        <CardContent className="">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    answeredCount === totalQuestions ? "default" : "secondary"
                  }
                >
                  {answeredCount}/{totalQuestions} Answered
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-2">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-xl leading-relaxed flex-1">
              {currentQuestion.questionText}
            </CardTitle>
            <Badge className="flex-shrink-0">Q{currentQuestionIndex + 1}</Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <RadioGroup
            value={answers[currentQuestionIndex] || ""}
            onValueChange={handleSelectAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, idx) => (
              <div
                key={idx}
                className={`relative flex items-start space-x-3 rounded-lg border-2 p-4 transition-all cursor-pointer ${
                  answers[currentQuestionIndex] === option
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-accent"
                }`}
              >
                <RadioGroupItem
                  value={option}
                  id={`option-${idx}`}
                  className="mt-0.5"
                />
                <Label
                  htmlFor={`option-${idx}`}
                  className="flex-1 cursor-pointer text-base font-normal leading-relaxed"
                >
                  <span className="font-semibold text-primary mr-2">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="">{option}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestionIndex === 0}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        {currentQuestionIndex === totalQuestions - 1 ? (
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={handleNext} className="flex-1">
            Next Question
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Question Navigator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-primary flex items-center gap-2">
            Quick Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, idx) => (
              <Button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                variant={idx === currentQuestionIndex ? "default" : "outline"}
                size="icon"
                className={`h-10 w-10 font-semibold ${
                  idx === currentQuestionIndex
                    ? ""
                    : answers[idx]
                    ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100 hover:text-green-800"
                    : ""
                }`}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
