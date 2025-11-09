import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  badge,
  badgeVariant = "secondary",
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
              <p className="mt-2 text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                {description}
              </p>
            </div>
            <div className="flex-shrink-0 text-slate-400 group-hover:text-primary transition-colors">
              {icon}
            </div>
          </div>
        </CardHeader>

        {badge && (
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <Badge variant={badgeVariant}>{badge}</Badge>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        )}

        {!badge && (
          <CardContent className="pt-0">
            <ArrowRight className="h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
