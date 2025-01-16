import { useMutation } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetEmailThreadSummaries = () => {
  return useMutation({
    mutationFn: async (prompt: string) => {
      const res = await fetch(`${backendUrl}/email-thread-summarizer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
};
