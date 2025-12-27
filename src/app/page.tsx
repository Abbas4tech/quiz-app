import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  ArrowRight,
  Brain,
  Target,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-[100dvh] bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] pt-[70px] prose-h4:xl:text-2xl prose-h4:lg:text-xl prose-h4:text-lg">
      {/* Hero Section */}
      <ThemeToggle className="fixed z-10 p-4 top-4 right-4" />
      <section className="border-b-4">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Badge */}
            <Badge variant="default" className="px-4 py-2">
              <Sparkles className="h-3 w-3 mr-2" />
              Test Your Knowledge Today
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Welcome to <span className="text-primary">Quiz Arena</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Wanna test your knowledge? Let&apos;s dive into a bunch of
                amazing quizzes and challenge yourself!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/quizzes">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="default" className="text-base">
                <Link href="/quizzes">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Quizzes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b-4">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Why Choose Quiz Arena?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The best platform to test your knowledge and learn something new
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <Card className="bg-secondary-background">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-main/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Diverse Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore quizzes across multiple subjects and difficulty levels
                  to match your expertise
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-secondary-background">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-main/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Instant Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get immediate feedback with detailed explanations for each
                  answer
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-secondary-background">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-main/10 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor your performance and see how you improve over time
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b-4 bg-secondary-background">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-primary">
                50+
              </div>
              <div className="text-muted-foreground text-sm sm:text-base">
                Active Quizzes
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-primary">
                1.2K+
              </div>
              <div className="text-muted-foreground text-sm sm:text-base">
                Happy Learners
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-primary">
                5K+
              </div>
              <div className="text-muted-foreground text-sm sm:text-base">
                Questions Answered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-b-4">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <Card className="bg-secondary-background">
              <CardHeader>
                <div className="mx-auto w-14 h-14 rounded-full bg-main/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle className="text-center">Choose a Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Browse through our collection and pick a topic that interests
                  you
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-secondary-background">
              <CardHeader>
                <div className="mx-auto w-14 h-14 rounded-full bg-main/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle className="text-center">Answer Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Take your time and answer each question to the best of your
                  ability
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-secondary-background">
              <CardHeader>
                <div className="mx-auto w-14 h-14 rounded-full bg-main/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle className="text-center">Get Your Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  See your results instantly with detailed explanations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b bg-secondary-background text-primary-foreground">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-lg opacity-90">
              Join thousands of learners and start your journey today!
            </p>
            <Button
              asChild
              size="lg"
              variant="default"
              className="text-base mt-4"
            >
              <Link href="/quizzes">
                Start Quiz Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Quiz Arena. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
