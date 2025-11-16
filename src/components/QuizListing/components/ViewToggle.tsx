"use client";

import React from "react";
import { Grid3x3, List } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useQuizListing } from "../context/QuizListingContext";

export default function ViewToggle(): React.JSX.Element {
  const { setViewType, viewType } = useQuizListing();

  return (
    <ToggleGroup variant={"outline"} defaultValue={viewType} type="single">
      <ToggleGroupItem
        className="cursor-pointer"
        onClick={() => setViewType("grid")}
        value="grid"
        aria-label="Toggle Grid"
      >
        <Grid3x3 className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="cursor-pointer"
        onClick={() => setViewType("table")}
        value="table"
        aria-label="Toggle List"
      >
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
