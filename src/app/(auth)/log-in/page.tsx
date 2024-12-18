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

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") router.push("/");
  }, [session, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) toast.error("Invaild credentials");
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
          router.push("/");
          form.reset();
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="flex min-h-full flex-col justify-center pb-12 pt-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Log in to your account
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

                <FormMessage className="text-lg">
                  {form.formState.errors.root?.message}
                </FormMessage>

                <Button
                  variant="blue"
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                >
                  Log in
                </Button>
              </form>
            </Form>

            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>New to Gatherly</div>
              <a
                href="/sign-up"
                className="underline cursor-pointer"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
