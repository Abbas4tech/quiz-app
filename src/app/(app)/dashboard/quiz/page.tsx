import React from "react";

import { getAllQuizzes } from "@/actions/quiz";
import QuizListings from "@/components/QuizListing";

export default async function QuizPage(): Promise<React.JSX.Element> {
  const quizzes = await getAllQuizzes();

  return (
    <div>
      <QuizListings
        title="Manage your Quizzes"
        quizzes={quizzes}
        config={{ isPrivate: true, itemsPerPage: 9 }}
      />
    </div>
  );
}
