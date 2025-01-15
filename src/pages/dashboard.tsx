import { useState } from "react";
import { fakeTasks } from "@/constants/Tasks";
import { Task } from "@/interfaces/types";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "@/components/ui/table";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import TaskTableRow from "@/components/dashboard/task-table-row";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(fakeTasks);

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.TaskID === updatedTask.TaskID ? updatedTask : task
      )
    );
  };

  const groupedTasks: {
    [key: string]: Task[];
  } = {
    todo: tasks.filter((task) => task.Status === "todo"),
    in_progress: tasks.filter((task) => task.Status === "in_progress"),
    done: tasks.filter((task) => task.Status === "done"),
  };

  return (
    <div className="font-poppins p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Accordion type="multiple" defaultValue={["todo", "in_progress", "done"]}>
        {Object.keys(groupedTasks).map((status) => (
          <AccordionItem value={status} key={status}>
            <AccordionTrigger>
              {status.replace("_", " ").toUpperCase()}
            </AccordionTrigger>
            <AccordionContent>
              <Table className="mb-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedTasks[status].map((task) => (
                    <TaskTableRow
                      key={task.TaskID}
                      task={task}
                      onUpdate={handleUpdateTask}
                    />
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
