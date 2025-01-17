import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { fakeTasks } from "@/constants/constants";
import { cn, formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from "@/interfaces/types";
import { useGetTasksByUserId } from "@/apis/tasks";
import { useUser } from "@clerk/clerk-react";
import { useGetUserByEmail } from "@/apis/users";
import { useGetTagsByUserId } from "@/apis/tags";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  // BreadcrumbLink,
  // BreadcrumbSeparator,
  // BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function Home() {
  const { isLoaded: isClerkLoaded, user: clerkUser } = useUser(); // Ensure Clerk is fully loaded
  console.log("clerkUser", clerkUser);
  const userEmail = clerkUser?.primaryEmailAddress?.emailAddress;
  console.log("userEmail in home.tsx", userEmail);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("clerkUser in home.tsx", clerkUser);
  //   }, 1000);
  // }, [clerkUser]);

  // Fetch user by email
  const { data: user, isLoading: isUserLoading } =
    useGetUserByEmail("e1075551@u.nus.edu");
  console.log("user in home.tsx", user);

  // Extract userId, wait for user to load
  const userId = user?.user_id;
  console.log("userId in home.tsx", userId);

  // Fetch tasks based on userId
  const { data: userTasks = [], isPending: isTasksPending } =
    useGetTasksByUserId(userId || 0);
  console.log("userTasks in home.tsx", userTasks);

  const { data: tags = [] } = useGetTagsByUserId(user?.user_id);

  // Handle loading states
  if (!isClerkLoaded || isUserLoading) {
    return <div>Loading user information...</div>;
  }

  if (isTasksPending) {
    return <div>Loading tasks...</div>;
  }

  const upcomingTasks = userTasks.filter(
    (task) => new Date(task.end_date) > new Date()
  );

  if (!clerkUser) {
    return (
      <div className="p-4 flex flex-col items-center">
        <img src="/ant.svg" alt="AntBib Logo" className="w-24 h-24" />
        <h1 className="text-2xl font-bold mb-4">Welcome to AntBib</h1>
        <p>Please sign in to view your tasks.</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <div className="overflow-x-auto mb-8">
        <Tabs>
          <TabsList>
            <TabsTrigger value="todo">Todo</TabsTrigger>
            <TabsTrigger value="developing">In Progress</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
          <TabsContent value="todo">
            <TaskTable
              tasks={userTasks.filter((task) => task.status === "todo")}
            />
          </TabsContent>
          <TabsContent value="developing">
            <TaskTable
              tasks={userTasks.filter((task) => task.status === "developing")}
            />
          </TabsContent>
          <TabsContent value="done">
            <TaskTable
              tasks={userTasks.filter((task) => task.status === "done")}
            />
          </TabsContent>
        </Tabs>
      </div>
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
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
            {userTasks.map((task) => (
              <TableRow key={task.task_id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell
                  className={cn(
                    task.status === "todo" ? "text-red-500" : "",
                    task.status === "developing" ? "text-yellow-500" : "",
                    task.status === "done" ? "text-green-500" : ""
                  )}
                >
                  {task.status}
                </TableCell>
                <TableCell>
                  {task.start_date ? formatDateTime(task.start_date) : ""}
                </TableCell>
                <TableCell>{formatDateTime(task.end_date) || "N/A"}</TableCell>
                {/* <TableCell>{task.priority}</TableCell> */}
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

      <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>
      <div className="overflow-x-auto mb-8">
        <Table className="min-w-full bg-white border">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingTasks?.map((task) => (
              <TableRow key={task.task_id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell
                  className={cn(
                    task.status === "todo" ? "text-red-500" : "",
                    task.status === "developing" ? "text-yellow-500" : "",
                    task.status === "done" ? "text-green-500" : ""
                  )}
                >
                  {task.status}
                </TableCell>
                <TableCell>{formatDateTime(task.start_date)}</TableCell>
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

      <h2 className="text-xl font-bold mb-4">My Work</h2>
      <Tabs>
        <TabsList>
          {Array.isArray(tags) &&
            tags.map((tag, index) => (
              <TabsTrigger key={index} value={tag}>
                {tag && (
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>{tag}</BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                )}
              </TabsTrigger>
            ))}
        </TabsList>
        {Array.isArray(tags) &&
          tags.map((tag, index) => (
            <TabsContent key={index} value={tag}>
              <TaskTable
                tasks={userTasks.filter((task) => task?.tags?.includes(tag))}
              />
            </TabsContent>
          ))}
      </Tabs>
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
            <TableHead>Priority</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task.task_id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell
                className={cn(
                  task.status === "todo" ? "text-red-500" : "",
                  task.status === "developing" ? "text-yellow-500" : "",
                  task.status === "done" ? "text-green-500" : ""
                )}
              >
                {task.status}
              </TableCell>
              <TableCell>{formatDateTime(task.start_date)}</TableCell>
              <TableCell>{formatDateTime(task.end_date) || "N/A"}</TableCell>
              <TableCell>{task.priority}</TableCell>
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
