"use client";

import Loading from "@/components/fallbacks/Loading";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get("/api/getcurrentuser");
      return response.data;
    },
  });

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
