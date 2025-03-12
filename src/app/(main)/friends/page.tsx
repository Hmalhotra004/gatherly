"use client";
import { signOut } from "next-auth/react";

const page = () => {
  return (
    <div>
      page
      <button onClick={() => signOut()}>log out</button>
    </div>
  );
};

export default page;
