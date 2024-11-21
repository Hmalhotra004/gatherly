"use client";

import { Variant } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { z } from "zod";
import Button from "../Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import AuthInput from "./AuthInput";
import AuthLabel from "./AuthLabel";
import AuthSocialButton from "./AuthSocialButton";

interface AuthFormProps {
  variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant>>;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "name cannot be more than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const AuthForm = ({ variant, setVariant }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") router.push("/friends");
  }, [session, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [setVariant, variant]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    form.reset();
    if (variant === "REGISTER") {
      await axios
        .post("/api/register", values)
        .then(() => signIn("credentials", values))
        .catch(() => toast.error("something went wrong"))
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...values,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) toast.error("Invaild credentials");
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) toast.error("Invaild credentials");
        if (callback?.ok && !callback?.error) toast.success("Logged in");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <AuthLabel
                    field={field}
                    id="name"
                    fieldState={fieldState}
                  >
                    Name
                  </AuthLabel>
                  <FormControl>
                    <AuthInput
                      id="name"
                      type="text"
                      disabled={isLoading}
                      field={field}
                      fieldState={fieldState}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <AuthLabel
                    field={field}
                    id="email"
                    fieldState={fieldState}
                  >
                    Email Address
                  </AuthLabel>
                  <FormControl>
                    <AuthInput
                      id="email"
                      type="text"
                      disabled={isLoading}
                      field={field}
                      fieldState={fieldState}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <AuthLabel
                    field={field}
                    id="password"
                    fieldState={fieldState}
                  >
                    Password
                  </AuthLabel>
                  <FormControl>
                    <AuthInput
                      id="password"
                      type="password"
                      disabled={isLoading}
                      field={field}
                      fieldState={fieldState}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <Button
              fullWidth
              disabled={isLoading}
              type="submit"
            >
              {variant === "LOGIN" ? "Log in" : "Sign up"}
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Gatherly?"
              : "Already have and account"}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer"
          >
            {variant === "LOGIN" ? "Create and account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
