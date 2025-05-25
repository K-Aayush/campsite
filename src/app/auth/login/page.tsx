import LoginForm from "@/components/auth/LoginForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default page;
