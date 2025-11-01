"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Home } from "lucide-react";
import { JSX } from "react";
import { useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

import AuthButton from "./AuthButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function AppSidebar({
  quizzes,
}: {
  quizzes: { _id: string; title: string }[];
}): JSX.Element {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Quiz Admin</h2>
            <p className="text-xs text-muted-foreground">Manage your quizzes</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/quiz/new"}
                >
                  <Link href="/dashboard/quiz/new">
                    <Plus className="h-4 w-4" />
                    <span>Create New Quiz</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>All Quizzes ({quizzes.length})</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[400px]">
              <SidebarMenu>
                {quizzes.map((quiz) => (
                  <SidebarMenuItem key={quiz._id}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === `/dashboard/quiz/${quiz._id}`}
                    >
                      <Link href={`/dashboard/quiz/${quiz._id}`}>
                        <FileText className="h-4 w-4" />
                        <span className="truncate">{quiz.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {session?.user && (
        <SidebarFooter className="border-t flex-row justify-between p-4">
          <div className="w-full flex items-center gap-2">
            <Image
              src={session?.user.image as string}
              width={30}
              height={30}
              className="rounded-full"
              alt={session?.user.name as string}
            />
            {session?.user.name}
          </div>

          <Tooltip>
            <TooltipTrigger>
              <AuthButton
                variant="ghost"
                className="justify-start"
                size="default"
              />
            </TooltipTrigger>
            <TooltipContent>Logout</TooltipContent>
          </Tooltip>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
