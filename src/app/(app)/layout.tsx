import React from "react";
import { Metadata } from "next";

import { AppSidebar } from "@/components";
import { recentlyModifiedQuizzes } from "@/actions/quiz";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
  const rec = await recentlyModifiedQuizzes();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar recentlyModifiedQuizzes={rec} />
        <SidebarInset>
          <main className="flex-1 overflow-auto">
            <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b px-6">
              <div className="flex gap-4 h-full items-center">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-1/3!" />
                <DynamicBreadcrumb />
              </div>
              <ThemeToggle className="ml-auto" />
            </div>
            <div className="min-h-[100dvh] bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] prose-h4:xl:text-2xl prose-h4:lg:text-xl prose-h4:text-lg">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
