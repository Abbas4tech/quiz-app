"use client";

import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SubmitQuizDialogProps {
  open: boolean;
  answeredCount: number;
  totalQuestions: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SubmitQuizDialog({
  open,
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}: SubmitQuizDialogProps): React.JSX.Element {
  const unansweredCount = totalQuestions - answeredCount;
  const completionPercentage = Math.round(
    (answeredCount / totalQuestions) * 100
  );
  const hasUnanswered = unansweredCount > 0;

  return (
    <AlertDialog open={open} onOpenChange={(state) => !state && onCancel()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            {hasUnanswered ? (
              <AlertCircle className="h-5 w-5 text-amber-600" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            )}
            <AlertDialogTitle>
              {hasUnanswered ? "Unanswered Questions" : "Ready to Submit?"}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            {hasUnanswered
              ? "You have skipped some questions. Unanswered questions will be marked as incorrect."
              : "You have answered all questions. Submit your quiz now."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Summary Card */}
        <div className="space-y-3">
          <Card
            className={
              hasUnanswered
                ? "bg-amber-50 border-amber-200"
                : "bg-green-50 border-green-200"
            }
          >
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Answered */}
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-600">
                    {answeredCount}
                  </div>
                  <p className="text-xs font-medium text-green-700">Answered</p>
                </div>

                {/* Separator */}
                <Separator orientation="vertical" />

                {/* Unanswered */}
                <div className="space-y-1">
                  <div
                    className={`text-2xl font-bold ${
                      hasUnanswered ? "text-amber-600" : "text-slate-400"
                    }`}
                  >
                    {unansweredCount}
                  </div>
                  <p
                    className={`text-xs font-medium ${
                      hasUnanswered ? "text-amber-700" : "text-slate-600"
                    }`}
                  >
                    Unanswered
                  </p>
                </div>

                {/* Separator */}
                <Separator orientation="vertical" />

                {/* Total */}
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-600">
                    {totalQuestions}
                  </div>
                  <p className="text-xs font-medium text-blue-700">Total</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-700">
                    Completion Rate
                  </span>
                  <Badge variant="secondary">{completionPercentage}%</Badge>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      hasUnanswered ? "bg-amber-500" : "bg-green-500"
                    }`}
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning Message */}
          {hasUnanswered && (
            <div className="flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-900">
                  Important Note
                </p>
                <p className="text-xs text-amber-800">
                  {unansweredCount} question{unansweredCount !== 1 ? "s" : ""}{" "}
                  will be marked as incorrect. You can still go back and answer
                  them.
                </p>
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {hasUnanswered ? "Go Back" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              hasUnanswered
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }
          >
            {hasUnanswered ? "Submit Anyway" : "Submit Quiz"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
