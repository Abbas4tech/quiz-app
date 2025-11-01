"use client";

import React from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useQuizBuilder } from "../context/QuizBuilderContext";

export default function QuizTitleInput(): React.JSX.Element {
  const { form } = useQuizBuilder();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quiz Details</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter quiz title..."
                  className="text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
