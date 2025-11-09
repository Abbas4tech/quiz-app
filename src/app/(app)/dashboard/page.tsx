import React from "react";

import DashboardCard from "@/components/DashboardCard";
import { navigationItems } from "@/constants/navigation";

export default function DashboardPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-600">
          Manage your quizzes, profile, and account settings all in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => (
          <DashboardCard key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}
