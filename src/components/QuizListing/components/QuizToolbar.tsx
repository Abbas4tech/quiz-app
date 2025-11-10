"use client";

import React from "react";

import { QuizSearch, ViewToggle } from ".";

export default function QuizToolbar(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <QuizSearch />
      <ViewToggle />
    </div>
  );
}
