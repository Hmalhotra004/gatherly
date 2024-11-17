"use client";
import AuthForm from "@/components/auth/AuthForm";
import { Variant } from "@/types";
import { useState } from "react";

const Home = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  return (
    <div className="flex min-h-full flex-col justify-center pb-12 pt-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {variant === "LOGIN"
            ? "Log in to your account"
            : "Sign up an account"}
        </h2>
      </div>
      <AuthForm
        variant={variant}
        setVariant={setVariant}
      />
    </div>
  );
};

export default Home;
