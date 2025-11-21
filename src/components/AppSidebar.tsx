"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  FileText,
  SlidersHorizontal,
  LayoutDashboard,
} from "lucide-react";
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
import { getUpdatedTimeString } from "@/lib/utils";
import { PERMISSIONS } from "@/types/permissions";

import NavUser from "./NavUser";

export default function AppSidebar({
  recentlyModifiedQuizzes,
}: {
  recentlyModifiedQuizzes: {
    _id: string;
    title: string;
    updatedAt: Date;
  }[];
}): JSX.Element {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center">
            <SlidersHorizontal />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Control Panel</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            {session?.user.permissions.includes(PERMISSIONS._WRITE) && (
              <SidebarMenu>
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
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {recentlyModifiedQuizzes.length > 0 && session?.user.permissions && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex gap-1">
              <span>Recent Quizzes</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <ScrollArea className="h-[300px]">
                <SidebarMenu>
                  {recentlyModifiedQuizzes.map((quiz) => (
                    <SidebarMenuItem key={quiz._id}>
                      <SidebarMenuButton
                        asChild
                        size={"lg"}
                        isActive={pathname === `/dashboard/quiz/${quiz._id}`}
                      >
                        <Link href={`/dashboard/quiz/${quiz._id}`}>
                          <FileText className="h-4 w-4 mb-3" />
                          <p className="truncate flex flex-col">
                            {quiz.title}

                            <span className="text-xs text-muted-foreground">
                              {getUpdatedTimeString(quiz.updatedAt)}
                            </span>
                          </p>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t flex-row justify-between p-4">
        <NavUser
          user={{
            avatar: session?.user.image as string,
            email: session?.user.email as string,
            name: session?.user.name as string,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
