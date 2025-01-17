import { useQuery } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// export const useGetTagsByUserId = (userId: number | undefined) => {
//   return useQuery<string[]>({
//     queryKey: ["tags", userId],
//     queryFn: async () => {
//       const res = await fetch(`${backendUrl}/tags/user/${userId}`);
//       const data = await res.json();
//       return data || [];
//     },
//   });
// };

export const useGetTagsByUserEmail = (email: string | undefined) => {
  return useQuery<string[]>({
    queryKey: ["tags", "email", email],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tags/user/email/${email}`);
      const data = await res.json();
      return data || [];
    },
  });
};
