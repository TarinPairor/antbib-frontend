import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime, textWithEllipsis } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from "@/interfaces/types";
import { useGetTasksByUserEmail } from "@/apis/tasks";
import { useUser } from "@clerk/clerk-react";
import { useGetTagsByUserEmail } from "@/apis/tags";
import { useContext } from "react";
import { UserContext } from "@/contexts/user-context";
import LandingPage from "@/components/home/landing-page";
import Centralizer from "@/components/centralizer";
import LoadingSpinner from "@/components/loading-spinner";
import Typewriter, { TypewriterClass } from "typewriter-effect";
import { SeparatorHorizontalIcon } from "lucide-react";

export default function Home() {
  const { user: user } = useContext(UserContext);
  // console.log("user in home.tsx", user);
  const { isLoaded: isClerkLoaded, user: clerkUser } = useUser(); // Ensure Clerk is fully loaded

  console.log("clerkUser in home.tsx", clerkUser);
  console.log("user in home.tsx", user);

  const { data: userTasks = [], isPending: isTasksPending } =
    useGetTasksByUserEmail(user?.user_email || "");

  const { data: tags = [] } = useGetTagsByUserEmail(user?.user_email);
  console.log("tags in home.tsx", tags);

  // Handle loading states
  if (!isClerkLoaded || isTasksPending) {
    return (
      <Centralizer className="top-1/2">
        <LoadingSpinner className="fill-purple-500" />
      </Centralizer>
    );
  }

  if (isTasksPending) {
    return (
      <Centralizer className="top-1/2">
        <LoadingSpinner className="fill-blue-500" />
      </Centralizer>
    );
  }

  const upcomingTasks = Array.isArray(userTasks)
    ? userTasks.filter((task) => new Date(task.end_date) > new Date())
    : [];

  if (!clerkUser) {
    return <LandingPage />;
  }

  const YourTasks = () => {
    return (
      <div className="overflow-x-auto mb-8">
        <Tabs defaultValue="todo">
          <TabsList className="flex gap-1">
            <TabsTrigger value="todo">Todo</TabsTrigger>
            <TabsTrigger value="developing">In Progress</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
          <TabsContent value="todo">
            <TaskTable
              tasks={
                Array.isArray(userTasks)
                  ? userTasks.filter((task) => task.status === "todo")
                  : []
              }
            />
          </TabsContent>
          <TabsContent value="developing">
            <TaskTable
              tasks={
                Array.isArray(userTasks)
                  ? userTasks.filter((task) => task.status === "developing")
                  : []
              }
            />
          </TabsContent>
          <TabsContent value="done">
            <TaskTable
              tasks={
                Array.isArray(userTasks)
                  ? userTasks.filter((task) => task.status === "done")
                  : []
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const AllTasks = () => {
    return (
      <div className="overflow-x-auto mb-8">
        <Table className="min-w-full bg-white border">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(userTasks) &&
              userTasks.map((task) => (
                <TableRow key={task.task_id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    {textWithEllipsis(task.description, 20)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={`${
                        task.status === "todo"
                          ? "red"
                          : task.status === "developing"
                          ? "yellow"
                          : "green"
                      }`}
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {task.start_date ? formatDateTime(task.start_date) : ""}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(task.end_date) || "N/A"}
                  </TableCell>
                  <TableCell>
                    {task?.tags?.split(",").map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-gray-200 text-gray-800 p-1 m-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const UpcomingTasks = () => {
    return (
      <div className="overflow-x-auto mb-8">
        <Table className="min-w-full bg-white border">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              {/* <TableHead>Priority</TableHead> */}
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingTasks.map((task) => (
              <TableRow key={task.task_id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{textWithEllipsis(task.description, 20)}</TableCell>
                <TableCell>
                  <Badge
                    variant={`${
                      task.status === "todo"
                        ? "red"
                        : task.status === "developing"
                        ? "yellow"
                        : "green"
                    }`}
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {task.start_date ? formatDateTime(task.start_date) : ""}
                </TableCell>
                <TableCell>{formatDateTime(task.end_date) || "N/A"}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  {task?.tags?.split(",").map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-200 text-gray-800 p-1 m-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const MyWork = () => {
    return (
      <Tabs>
        <TabsList className="flex gap-1">
          {Array.isArray(tags) &&
            tags
              ?.filter((tag) => tag !== "")
              ?.map((tag, index) => {
                return (
                  <TabsTrigger key={index} value={tag}>
                    {tag}
                  </TabsTrigger>
                );
              })}
        </TabsList>
        {Array.isArray(tags) &&
          tags.map((tag, index) => (
            <TabsContent key={index} value={tag}>
              <TaskTable
                tasks={
                  Array.isArray(userTasks)
                    ? userTasks.filter((task) => task?.tags?.includes(tag))
                    : []
                }
              />
            </TabsContent>
          ))}
      </Tabs>
    );
  };

  if (!userTasks) {
    return (
      <Centralizer className="top-1/2">
        <p className="text-gray-800 dark:text-white">No tasks yet!</p>
      </Centralizer>
    );
  }
  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <p className="mb-2">
        <Typewriter
          options={{ loop: true }}
          onInit={(typewriter: TypewriterClass) => {
            typewriter
              .typeString("All your todos.")
              .pauseFor(1000)
              .deleteAll()
              .typeString("Toggle to see the tasks in progress.")
              .start();
          }}
        />
      </p>
      <YourTasks />
      <SeparatorHorizontalIcon />
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <AllTasks />
      <SeparatorHorizontalIcon />
      <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>
      <UpcomingTasks />
      <SeparatorHorizontalIcon />
      <h2 className="text-xl font-bold mb-4">My Work</h2>
      <MyWork />
    </div>
  );
}

function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white border">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task.task_id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{textWithEllipsis(task.description, 20)}</TableCell>
              <TableCell>
                <Badge
                  variant={`${
                    task.status === "todo"
                      ? "red"
                      : task.status === "developing"
                      ? "yellow"
                      : "green"
                  }`}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                {task.start_date ? formatDateTime(task.start_date) : ""}
              </TableCell>
              <TableCell>{formatDateTime(task.end_date) || "N/A"}</TableCell>
              <TableCell>
                {task?.tags?.split(",").map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-gray-200 text-gray-800 p-1 m-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
