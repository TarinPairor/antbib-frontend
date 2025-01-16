import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface EmailSummary {
  user: string;
  summary: string;
}

const fetchAI = async (prompt: string) => {
  const res = await fetch(`${backendUrl}/api/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch summary");
  }

  const data = await res.json();
  // Parse the nested JSON string in content
  const parsedContent = JSON.parse(data.choices[0].message.content);
  return parsedContent;
};

export default function EmailThreadSummarizer() {
  const [prompt, setPrompt] = useState("");

  const {
    mutate: summarize,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: fetchAI,
  });

  const handleSummarize = () => {
    if (!prompt.trim()) return;
    summarize(prompt);
  };

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Email Thread Summarizer</h1>
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder="Paste your email thread here..."
          className="w-full min-h-[100px] p-3 border rounded-md"
        />

        <button
          onClick={handleSummarize}
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? "Summarizing..." : "Summarize"}
        </button>

        {data?.email_summary && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.email_summary.map((item: EmailSummary, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.user}</TableCell>
                    <TableCell>{item.summary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {error && (
          <div className="p-4 text-red-500 bg-red-50 rounded-md">
            Error:{" "}
            {error instanceof Error ? error.message : "Failed to get summary"}
          </div>
        )}
      </div>
    </Card>
  );
}
