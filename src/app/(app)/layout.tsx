import { AppSidebar } from "@/components";

import { getAllQuizzes } from "@/actions/quiz";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quizzes = await getAllQuizzes();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar quizzes={quizzes} />
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Quiz Management</h1>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
