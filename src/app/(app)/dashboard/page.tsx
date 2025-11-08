import React from "react";

import { getAllQuizzes } from "@/actions/quiz";
import QuizListings from "@/components/QuizListing";

export default async function AdminDashboard(): Promise<React.JSX.Element> {
  const quizzes = await getAllQuizzes();

  return (
    <div>
      <QuizListings
        quizzes={quizzes}
        config={{ isPrivate: true, itemsPerPage: 5 }}
      />
    </div>
  );
}
