import React from "react";

import { getAllQuizzes } from "@/actions/quiz";
import QuizListings from "@/components/QuizListing";

export default async function QuizPage(): Promise<React.JSX.Element> {
  const { data } = await getAllQuizzes();

  return <QuizListings title="Manage your Quizzes" quizzes={data} />;
}
