"use client";

import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import AuthHeader from "./AuthHeader";
import BackButton from "./BackButton";
// import BackButton from "./BackButton";

import Socials from "./Socials";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] mx-auto my-auto h-fit shadow-md  ">
      <CardHeader>
        <AuthHeader headerLabel={headerLabel}></AuthHeader>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter
        // backButtonHref={backButtonHref}
        // backButtonLabel={backButtonLabel}
        >
          <Socials />
        </CardFooter>
      )}
      <CardFooter className="flex- justify-center">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
