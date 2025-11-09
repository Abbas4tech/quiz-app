"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const messages = [
  "Buckle up!!",
  "Hang on... We are on the way",
  "Loading awesomeness...",
  "Almost there...",
  "Fueling up the engine...",
  "Hold tight!",
  "Getting everything ready...",
  "One moment please...",
  "Magic in progress...",
  "Brewing something special...",
  "Stay tuned...",
  "Powering up...",
  "Just a sec...",
  "Charging up...",
  "Get ready...",
];

interface LoadingScreenProps {
  fullScreen?: boolean;
  message?: string;
}

export default function LoadingScreen({
  fullScreen = false,
  message,
}: LoadingScreenProps): React.JSX.Element {
  const [randomMessage, setRandomMessage] = useState<string>("");

  useEffect(() => {
    setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  const displayMessage = message || randomMessage;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-24 w-24 text-primary animate-spin" />
          <p className="text-lg font-bold dark:text-slate-300">
            {displayMessage}
          </p>
        </div>
      </div>
    );
  }

  // Inline loading component
  return (
    <div className="flex flex-col items-center gap-3 py-8 my-32">
      <Loader className="h-24 w-24 text-primary animate-spin" />
      <p className="text-lg font-bold dark:text-slate-300">{displayMessage}</p>
    </div>
  );
}

export function LoadingSpinner(): React.JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <Loader className="h-5 w-5 text-primary animate-spin" />
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
        Loading...
      </span>
    </div>
  );
}
