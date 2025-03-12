"use client";

import Loading from "@/components/fallbacks/Loading";
import { useGetCurrentUser } from "@/lib/fetch";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  const data = useGetCurrentUser();

  const isLoading = data.isLoading;

  const user = data.data;

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/log-in");
    } else {
      Cookies.set("userId", user.id, { expires: 30 });
      router.replace("/friends");
    }
  }, [user, router, isLoading]);

  return <Loading />;
};

export default HomePage;
