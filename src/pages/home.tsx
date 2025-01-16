import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fakeTasks } from "@/constants/constants";
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
  const clerkUser = useUser().user;
  const { data: user } = useGetUserByEmail(
    clerkUser?.primaryEmailAddress?.emailAddress || ""
  );
  const { data: userTasks = fakeTasks, isPending } = useGetTasksByUserId(
    user?.user_id || 0
  );
  const upcomingTasks = userTasks.filter(
    (task) => new Date(task.end_date) > new Date()
  );
  const { data: tags } = useGetTagsByUserId(user?.user_id || 0);

  if (isPending) {
    return <div>Loading...</div>;
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
              <TableHead>Priority</TableHead>
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
          {tags?.map((tag, index) => (
            <TabsTrigger key={index} value={tag}>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>{tag}</BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </TabsTrigger>
          ))}
        </TabsList>
        {tags?.map((tag, index) => (
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
