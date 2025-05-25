"use client";

import React from "react";
import { Button } from "../ui/button";
// import { signIn } from "next-auth/react";
// import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

import { Facebook, Globe } from "lucide-react"; // Lucide alternative to FaGithub, FcGoogle
import { signIn } from "next-auth/react";

const Socials = () => {
  const handleProviders = (provider: "google" | "facebook") => {
    console.log("provider", provider);
    signIn(provider, { callbackUrl: "/profile" });
  };

  return (
    <div className="flex items-center  w-full gap-2">
      <Button
        size={"lg"}
        className="flex-1"
        variant={"outline"}
        onClick={() => handleProviders("google")}
      >
        <Globe size={23} />
      </Button>
      <Button
        size={"lg"}
        className="flex-1"
        variant={"outline"}
        onClick={() => handleProviders("facebook")}
      >
        <Facebook size={23} />
      </Button>
    </div>
  );
};

export default Socials;
