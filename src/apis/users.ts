import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/interfaces/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetUserIdByEmail = (email: string) => {
  return useQuery<number>({
    queryKey: ["users", "email", email],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/users/email/${email}`);
      const data = await res.json();
      return data.user_id;
    },
  });
};

export const useGetUserById = (userId: number) => {
  return useQuery<User>({
    queryKey: ["users", userId],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/users/${userId}`);
      const data = await res.json();
      return data;
    },
  });
};

export const useGetUserByEmail = (email: string | undefined) => {
  return useQuery<User>({
    queryKey: ["users", "email", email],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/users/email/${email}`);
      const data = await res.json();
      return data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser: Omit<User, "user_id">) => {
      const res = await fetch(`${backendUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/users`);
      const data = await res.json();
      return data;
    },
  });
};

// export const useUpdateUsername = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({
//       userId,
//       username,
//     }: {
//       userId: string;
//       username: string;
//     }) => {
//       const res = await fetch(`${backendUrl}/users/${userId}/username`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username }),
//       });
//       const data = await res.json();
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["users"],
//       });
//     },
//   });
// };
