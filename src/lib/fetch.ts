import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetCurrentUser() {
  return useQuery<User>({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get("/api/getcurrentuser");
      return response.data;
    },
  });
}
