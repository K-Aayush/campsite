import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  href?: string;
  label?: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <div className=" ">
      <Button variant={"link"} size={"sm"} className="font-normal w-full">
        <Link href={href || "/"}>{label}</Link>
      </Button>
    </div>
  );
};

export default BackButton;
