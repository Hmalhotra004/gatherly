"use client";

import AuthInput from "@/components/auth/AuthInput";
import AuthLabel from "@/components/auth/AuthLabel";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .toLowerCase(),
    password: z.string().min(6, "Password should be at least 6 characters"),
    ConPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.ConPassword, {
    message: "Passwords do not match",
    path: ["ConPassword"],
  });

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") router.replace("/");
  }, [session, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      ConPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/register", {
        email: values.email,
        name: values.name,
        password: values.password,
      });
      if (response.status === 200) {
        form.reset();
        signIn("credentials", values);
        toast.success("Logged in");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center pb-12 pt-4 sm:px-6 lg:px-8 h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign Up
        </h2>
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
                        id="name"
                        field={field}
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
                          autoComplete="off"
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
                        id="email"
                        field={field}
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
                          autoComplete="email"
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

                <FormField
                  control={form.control}
                  name="ConPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <AuthLabel
                        field={field}
                        id="Confirm"
                        fieldState={fieldState}
                      >
                        Confirm Password
                      </AuthLabel>
                      <FormControl>
                        <AuthInput
                          id="Confirm"
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

                <FormMessage className="text-lg">
                  {form.formState.errors.root?.message}
                </FormMessage>

                <Button
                  variant="blue"
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                </Button>
              </form>
            </Form>

            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>Already have an account?</div>
              <Link
                href="/log-in"
                className="hover:underline cursor-pointer transition"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
