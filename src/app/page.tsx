"use client";

import Loading from "@/components/fallbacks/Loading";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  const { data: user } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get("/api/getcurrentuser");
      return response.data;
    },
  });

  useEffect(() => {
    if (!user) {
      router.replace("/log-in");
    } else {
      router.replace("/friends");
    }
  }, [user, router]);

  return <Loading />;
};

export default HomePage;
