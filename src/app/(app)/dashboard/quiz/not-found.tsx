import React from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] p-6 text-center space-y-6">
      <AlertCircle className="w-12 h-12 text-yellow-600" />
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground max-w-md">
        The quiz or page you are looking for does not exist or may have been
        removed.
      </p>
      <Button asChild>
        <Link href={"/dashboard"}>
          Dashboard <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
