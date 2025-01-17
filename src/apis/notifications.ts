import { useMutation, useQuery } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// const createNotification = async (user_email: string, message: string) => {
//   const response = await fetch(`${backendUrl}/email`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ user_email, message }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to create notification");
//   }

//   return response.json();
// };

export const createNotification = async (user_id: number, message: string) => {
  const response = await fetch(`${backendUrl}/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to create notification");
  }

  return response.json();
};

// export const useCreateNotification = () => {
//   return useMutation({
//     mutationFn: ({
//       user_email,
//       message,
//     }: {
//       user_email: string;
//       message: string;
//     }) => createNotification(user_email, message),
//   });
// };

export const useCreateNotification = () => {
  return useMutation({
    mutationFn: ({ user_id, message }: { user_id: number; message: string }) =>
      createNotification(user_id, message),
  });
};

const getNotificationsByUserEmail = async (user_email: string) => {
  const response = await fetch(
    `${backendUrl}/notifications/user/email/${user_email}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};

export const useGetNotificationsByUserEmail = (user_email: string) => {
  return useQuery({
    queryKey: ["notifications", user_email],
    queryFn: () => getNotificationsByUserEmail(user_email),
  });
};
