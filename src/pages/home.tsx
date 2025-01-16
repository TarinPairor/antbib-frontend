import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fakeTasks } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from "@/interfaces/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fetchAPI = async () => {
  const res = await fetch(`${backendUrl}/supabase_healthcheck/`);
  const data = await res.json();
  console.log(data);
};

export default function Home() {
  fetchAPI();
  const userTasks = fakeTasks.filter((task) => task.assigned_to === 1);
  const upcomingTasks = fakeTasks.filter(
    (task) => new Date(task.start_date) > new Date()
  );
  const tags = userTasks
    .map((task) => task.tags.split(","))
    .flat()
    .slice(0, 3);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">John Doe's Tasks</h1>
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
                    task.status === "in_progress" ? "text-yellow-500" : "",
                    task.status === "done" ? "text-green-500" : ""
                  )}
                >
                  {task.status}
                </TableCell>
                <TableCell>{task.start_date}</TableCell>
                <TableCell>{task.end_date || "N/A"}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  {task.tags.split(",").map((tag) => (
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
            {upcomingTasks.map((task) => (
              <TableRow key={task.task_id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell
                  className={cn(
                    task.status === "todo" ? "text-red-500" : "",
                    task.status === "in_progress" ? "text-yellow-500" : "",
                    task.status === "done" ? "text-green-500" : ""
                  )}
                >
                  {task.status}
                </TableCell>
                <TableCell>{task.start_date}</TableCell>
                <TableCell>{task.end_date || "N/A"}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  {task.tags.split(",").map((tag) => (
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

      <h2 className="text-xl font-bold mb-4">My Work</h2>
      <Tabs>
        <TabsList>
          {tags.map((tag) => (
            <TabsTrigger key={tag} value={tag}>
              {tag}
            </TabsTrigger>
          ))}
        </TabsList>
        {tags.map((tag) => (
          <TabsContent key={tag} value={tag}>
            <TaskTable
              tasks={userTasks.filter((task) => task.tags.includes(tag))}
            />
          </TabsContent>
        ))}
      </Tabs>

      <h2 className="text-xl font-bold mb-4">Task Status</h2>
      <Tabs>
        <TabsList>
          <TabsTrigger value="todo">Todo</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <TabsContent value="todo">
          <TaskTable
            tasks={userTasks.filter((task) => task.status === "todo")}
          />
        </TabsContent>
        <TabsContent value="in_progress">
          <TaskTable
            tasks={userTasks.filter((task) => task.status === "in_progress")}
          />
        </TabsContent>
        <TabsContent value="done">
          <TaskTable
            tasks={userTasks.filter((task) => task.status === "done")}
          />
        </TabsContent>
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
                  task.status === "in_progress" ? "text-yellow-500" : "",
                  task.status === "done" ? "text-green-500" : ""
                )}
              >
                {task.status}
              </TableCell>
              <TableCell>{task.start_date}</TableCell>
              <TableCell>{task.end_date || "N/A"}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                {task.tags.split(",").map((tag) => (
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
