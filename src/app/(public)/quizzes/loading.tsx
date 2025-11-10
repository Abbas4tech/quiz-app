"use client";

import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const messages: string[] = [
  "Buckle up, topper! Quiz engine garam ho raha hai… 🚀🧠",
  "Bas thoda sa buffering, phir tumhari IQ ka asli test! ⏳😎",
  "Coffee ready? Questions aa rahe hain like aapki notifications ☕📲",
  "Server bolta: “Zara sabr karo, marks on the way.” 🚌💯",
  "Mind ko stretch karo, warm-up ho raha hai… 🧠🏋️‍♂️",
  "Network ko bhi thoda revision chahiye, data aa raha hai… 📡📚",
  "Almost there! Correct answers bhi tumhari tarah punctual nahi hain ⏰😉",
  "UI make-up kar raha hai, tum tension mat lo 💅✨",
  "Zaroorat se zyada sochna band karo, pehle load to hone do 🤯➡️🙂",
  "Today’s vibe: guess mat karna, smart guess karna 😌🎯",
  "Quiz bhi kehta: “Main aa raha hoon… slow motion me.” 🐢🎬",
  "Calculators ko charge karlo… just kidding, dimaag ka use hoga 🔋🙃",
  "Marks ke sapne kam, options pe focus zyada 😴➡️🔍",
  "Loading that one question jisme tum full confident hoge 🤞⭐",
  "Bas do pal… phir ‘A, B, C, D’ ka asli khel shuru ♟️🔠",
  "Apni seatbelt baandho, leaderboard udne wala hai ✈️🏆",
  "Tum ready ho, server thoda introvert hai… aa raha hai 😅🌐",
  "Buffering mein bhi progress hoti hai—jaise Monday motivation 📈😪",
  "Jo bhi ho, negative marking se dosti mat karna 🚫➖",
  "Abhi ke liye patience, baad mein celebration 🥳⌛",
  "Keyboard ko heavy mat samjho, options light hi hain ⌨️🪶",
  "Internet ko thoda sharam aa rahi hai, aa hi jayega 📶😳",
  "Syllabus se zyada questions nai, bas better packaged 🎁📘",
  "Mind palace unlock ho raha hai… 🏰🔑",
  "Himmat rakho, ‘All of the above’ kabhi kabhi sahi hota hai 😌✅",
  "Thoda suspense, phir full syllabus ka jalwa 🎬📚",
  "Ye loading tumhe zyada intelligent bana raha hai… placebo hai 😉🧪",
  "Abhi se calculator? Arre MCQ hai yaar 😄📏",
  "Timer ko ignore karo, pehle quiz ko aane do ⏱️🙈",
  "Options ko dekh ke ‘it depends’ mat bolna 😅⚖️",
  "Wi‑Fi bhi soch raha hai: “ye wala topper lagta hai.” 📶😎",
  "Jab tak loading hai, ek confident smile kar lo 🙂📸",
  "Server ki gym membership khatam, isliye thoda slow 🏋️‍♀️🐌",
  "Bas ek choti si push, phir brain gains only 💪🧠",
  "Thoda patience, warna ‘mark for review’ forever ho jayega 📝🌀",
  "Practice mode on, excuses off 🎯🛑",
  "MCQ ka dharam: ek sahi, teen dhokebaaz 😈✅",
  "Paper leak nahi, bas data fetch ho raha hai 🤫📥",
  "Leaderboard so raha tha, abhi jag raha hai 😴➡️🏆",
  "Tareekh note karlo, aaj se preparation serious hogi 📅🔥",
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
