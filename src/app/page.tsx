import React from "react";

export default function Home(): React.JSX.Element {
  // Remove below to get Started
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Nextjs Starter Kit</h1>
        <p>
          Simple Kit Includes, Mongoose ODM, Zod Schema for Validation, NextAuth
          with Google Signin and beautifull styled Shadcn components
        </p>
      </main>
    </div>
  );
}
