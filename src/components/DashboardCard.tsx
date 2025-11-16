import React from "react";
import Link from "next/link";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

export default function DashboardCard({
  title,
  description,
  icon,
  href,
}: DashboardCardProps): React.JSX.Element {
  return (
    <Link href={href}>
      <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/50 group">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <p className="mt-2 text-sm text-muted-foreground transition-colors">
                {description}
              </p>
            </div>
            <div className="flex-shrink-0 text-slate-400 group-hover:text-primary transition-colors">
              {icon}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
