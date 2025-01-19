import Typewriter, { TypewriterClass } from "typewriter-effect";
import Centralizer from "../centralizer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function LandingPage() {
  const features = [
    {
      title: "Task Scheduling",
      description:
        "Arrange meetings and tasks with authors, publishers, and event partners.",
    },
    {
      title: "Automated Follow-Ups",
      description:
        "Send follow-up tasks to collaborators or team members post-meetings.",
    },
    {
      title: "Reminders",
      description:
        "Automate reminders for key events like book launches, workshops, and committee meetings.",
    },
    {
      title: "Email Thread Summaries",
      description:
        "Generate concise summaries of email discussions for efficient decision-making.",
    },
  ];

  return (
    <>
      <Centralizer className="top-1/4 flex flex-col">
        <h1 className="text-9xl mb-2 font-mono">AntBiB</h1>
        <h1>
          <Typewriter
            options={{ loop: true }}
            onInit={(typewriter: TypewriterClass) => {
              typewriter
                .typeString("Welcome to AntBib!")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Best task manager!")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Best notifier!")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Best email thread summarizer!")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Sign up now to get started!")
                .start();
            }}
          />
        </h1>
        <div className="p-4 flex flex-col items-center">
          <img src="/ant.svg" alt="AntBib Logo" className="w-48 h-48" />
          <p className="hover:underline text-lg">
            Please sign in to view your tasks.
          </p>
        </div>
        <ScrollArea>
          <div className="p-2 flex flex-wrap gap-4 aspect-video">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="shadow-lg min-w-[250px] md:min-w-[calc(60%-1rem)] lg:min-w-[calc(40%-1rem)]"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Centralizer>
    </>
  );
}
