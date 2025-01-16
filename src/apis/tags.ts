import { useQuery } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetTagsByUserId = (userId: number) => {
  console.log("userId", userId);
  return useQuery<string[]>({
    queryKey: ["tags", userId],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tags/user/${userId}`);
      const data = await res.json();
      return data || [];
    },
  });
};
