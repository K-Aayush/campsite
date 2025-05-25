import React from "react";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

interface HeaderProps {
  headerLabel?: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const AuthHeader = ({ headerLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>🔐 Auth</h1>
      <p className="">{headerLabel}</p>
    </div>
  );
};

export default AuthHeader;
