import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, Subtask, User } from "@/interfaces/types";
import { fakeTasks } from "@/constants/constants";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetAllTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tasks`);
      const data = await res.json();
      if (data.error) {
        return fakeTasks;
      }
      return data;
    },
  });
};

export const useGetTasksByUserId = (userId: number) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      console.log("useGetTasksByUserId userId", userId);
      console.log("userId", userId);
      const res = await fetch(`${backendUrl}/tasks/user/${userId}`);
      const data = await res.json();
      return data;
    },
    // refetchOnWindowFocus: false, // Prevent refetching on window focus
    // refetchOnMount: false, // Prevent refetching when component mounts
  });
};

export const useGetUpcomingTasksByUserId = (userId: number) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", userId, "upcoming"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tasks/user/${userId}/upcoming`);
      const data = await res.json();
      return data;
    },
  });
};

export const useGetTasksByUserIdAndTag = (userId: number, tag: string) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", userId, "tag", tag],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tasks/user/${userId}/tag/${tag}`);
      const data = await res.json();
      return data;
    },
  });
};

export const useGetTasksByUserIdAndStatus = (
  userId: number,
  status: string
) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", userId, "status", status],
    queryFn: async () => {
      const res = await fetch(
        `${backendUrl}/tasks/user/${userId}/status/${status}`
      );
      const data = await res.json();
      return data;
    },
  });
};

export const useGetTasksByStatus = (status: string) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", "status", status],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tasks/status/${status}`);
      const data = await res.json();
      return data;
    },
  });
};

export const useGetSubtasksByTaskId = (taskId: string) => {
  return useQuery<Subtask[]>({
    queryKey: ["tasks", taskId, "subtasks"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tasks/${taskId}/subtasks`);
      const data = await res.json();
      return data;
    },
  });
};

export const useGetAssigneesByTaskId = (taskId: string) => {
  return useQuery<User[]>({
    queryKey: ["tasks", taskId, "assignees"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/tasks/${taskId}/assignees`);
      const data = await res.json();
      return data;
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTask: Omit<Task, "task_id">) => {
      const res = await fetch(`${backendUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};

export const useUpdateTaskAssignee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      taskId,
      assignedTo,
    }: {
      taskId: string;
      assignedTo: number;
    }) => {
      const res = await fetch(`${backendUrl}/tasks/${taskId}/assignee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assigned_to: assignedTo }),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedTask: Task) => {
      const res = await fetch(`${backendUrl}/tasks/${updatedTask.task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};

// export const useGetUserIdByEmail = (email: string) => {
//   return useQuery<number>({
//     queryKey: ["users", "email", email],
//     queryFn: async () => {
//       const res = await fetch(`${backendUrl}/tasks/users/email/${email}`);
//       const data = await res.json();
//       return data.user_id;
//     },
//   });
// };

// export const useGetUserById = (userId: number) => {
//   return useQuery<User>({
//     queryKey: ["users", userId],
//     queryFn: async () => {
//       const res = await fetch(`${backendUrl}/tasks/users/${userId}`);
//       const data = await res.json();
//       return data;
//     },
//   });
// };

// export const useGetUserByEmail = (email: string) => {
//   return useQuery<User>({
//     queryKey: ["users", "email", email],
//     queryFn: async () => {
//       const res = await fetch(`${backendUrl}/tasks/users/email/${email}`);
//       const data = await res.json();
//       return data;
//     },
//   });
// };

// export const useCreateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (newUser: Omit<User, "user_id">) => {
//       const res = await fetch(`${backendUrl}/tasks/users`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newUser),
//       });
//       const data = await res.json();
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey: ["users"]});
//     },
//   });
// };

// export const useUpdateUsername = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({ userId, username }: { userId: number; username: string }) => {
//       const res = await fetch(`${backendUrl}/tasks/users/${userId}/username`, {
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
//       })
//     },
//   });
// };

// export const useCreateNotification = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (newNotification: Omit<Notification, "notification_id">) => {
//       const res = await fetch(`${backendUrl}/tasks/notifications`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newNotification),
//       });
//       const data = await res.json();
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["notifications"],
//       })
//     },
//   });
// };

// export const useGetNotificationsByUserId = (userId: number) => {
//   return useQuery<Notification[]>({
//     queryKey: ["notifications", userId],
//     queryFn: async () => {
//       const res = await fetch(`${backendUrl}/tasks/notifications/user/${userId}`);
//       const data = await res.json();
//       return data;
//     },
//   });
// };
