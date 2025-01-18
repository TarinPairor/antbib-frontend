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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col justify-between items-center mb-4 gap-3">
        <h1 className="text-2xl font-bold mb-4 ">Email Thread Summary</h1>
        <p>
          Summarize an email thread into key points for each user involved. Just
          copy and paste the email thread and click "Summarize".
        </p>
        <div className="w-full flex flex-col gap-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Paste your email thread here..."
            className=" min-h-[100px] p-3 border rounded-md"
          />

          <Button onClick={handleSummarize} disabled={isPending}>
            {isPending ? "Summarizing..." : "Summarize"}
          </Button>

          <div className="mt-6 ">
            <h2 className="text-xl font-bold mb-4 ">Summary</h2>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.email_summary.map(
                  (item: EmailSummary, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.user}</TableCell>
                      <TableCell>{item.summary}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>

          {error && (
            <div className="p-4 text-red-500 bg-red-50 rounded-md">
              Error:{" "}
              {error instanceof Error ? error.message : "Failed to get summary"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
