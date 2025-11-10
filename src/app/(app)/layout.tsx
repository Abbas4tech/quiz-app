import React from "react";
import { Metadata } from "next";

import { AppSidebar } from "@/components";
import { getAllQuizzes, recentlyModifiedQuizzes } from "@/actions/quiz";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { DynamicBreadcrumb } from "@/components/Breadcrumb";
import { Separator } from "@/components/ui/separator";

export const generateMetadata = (): Metadata => ({
  title: "Dashboard | Quiz Arena",
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const quizzes = await getAllQuizzes();
  const rec = await recentlyModifiedQuizzes();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar recentlyModifiedQuizzes={rec} quizzes={quizzes} />
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <div className="flex gap-4 h-full items-center">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-1/3!" />
              <DynamicBreadcrumb />
            </div>
            <ThemeToggle className="ml-auto" />
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
