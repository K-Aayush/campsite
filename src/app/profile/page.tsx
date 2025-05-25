import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  console.log("data", session);
  return (
    <div>
      Name: {session?.user?.email}
      {session?.toString()}
    </div>
  );
};

export default page;
