"use client";

import React from "react";
import { Grid3x3, List } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQuizListing } from "../context/QuizListingContext";

export default function ViewToggle(): React.JSX.Element {
  const { viewType, setViewType } = useQuizListing();

  return (
    <div className="flex gap-1 border rounded-lg p-1 bg-slate-50 w-fit">
      <Button
        variant={viewType === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewType("grid")}
        className="h-8 w-8 p-0"
        title="Grid View"
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewType === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewType("table")}
        className="h-8 w-8 p-0"
        title="Table View"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
