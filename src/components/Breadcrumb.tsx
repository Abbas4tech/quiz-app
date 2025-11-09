"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Dynamic Breadcrumb component using shadcn Breadcrumb
 *
 * Features:
 * - Auto-generates breadcrumbs from URL path
 * - Customizable segment labels
 * - Supports dynamic routes with [id] parameters
 * - Home link always included
 * - Responsive design
 * - Uses shadcn Breadcrumb component
 *
 * Usage:
 * <DynamicBreadcrumb />
 *
 * Or with custom segment labels:
 * <DynamicBreadcrumb
 *   segmentLabels={{
 *     "dashboard": "Dashboard",
 *     "quizzes": "My Quizzes",
 *     "quiz": "Quiz Details"
 *   }}
 * />
 */

interface DynamicBreadcrumbProps {
  segmentLabels?: Record<string, string>;
}

export function DynamicBreadcrumb({
  segmentLabels = {},
}: DynamicBreadcrumbProps): React.JSX.Element | null {
  const pathname = usePathname();

  // Default segment label mappings
  const defaultLabels: Record<string, string> = {
    dashboard: "Dashboard",
    quizzes: "Quizzes",
    quiz: "Quiz",
    profile: "Profile",
    settings: "Settings",
    analytics: "Analytics",
    candidates: "Candidates",
    notifications: "Notifications",
    edit: "Edit",
    create: "Create",
    [""]: "Home",
  };

  // Merge custom labels with defaults
  const labels = { ...defaultLabels, ...segmentLabels };

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): Array<{
    label: string;
    href: string;
    isActive: boolean;
  }> => {
    const segments = pathname.split("/").filter((seg) => seg);

    const breadcrumbs: Array<{
      label: string;
      href: string;
      isActive: boolean;
    }> = [
      {
        label: "Home",
        href: "/",
        isActive: pathname === "/",
      },
    ];

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Skip dynamic route segments like [id], but keep their parent
      if (segment.startsWith("[") && segment.endsWith("]")) {
        return;
      }

      const label = labels[segment] || formatSegment(segment);

      breadcrumbs.push({
        label,
        href: currentPath,
        isActive: isLast,
      });
    });

    return breadcrumbs;
  };

  // Format segment to readable label
  const formatSegment = (segment: string): string =>
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && <BreadcrumbSeparator />}

            {item.isActive ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
