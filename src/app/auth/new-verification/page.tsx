import { NewVerificationForm } from "@/components/auth/NewVerificationForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};

export default page;
