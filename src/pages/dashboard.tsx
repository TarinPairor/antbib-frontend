import { Task } from "@/interfaces/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateTask } from "@/apis/tasks";
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
import { useGetAllTasks } from "@/apis/tasks";
import { useGetAllUsers, useGetUserByEmail } from "@/apis/users";
import { fakeUsers } from "@/constants/constants";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useUser } from "@clerk/clerk-react";
import Typewriter, { TypewriterClass } from "typewriter-effect";

export default function Dashboard() {
  const clerkUser = useUser().user;
  const userEmail = clerkUser?.primaryEmailAddress?.emailAddress;
  const { data: user = fakeUsers[0] } = useGetUserByEmail(
    userEmail || "e1075551@u.nus.edu"
  );
  const { data: tasks } = useGetAllTasks();
  const { data: allUsers } = useGetAllUsers();
  const [newTask, setNewTask] = useState<Omit<Task, "task_id">>({
    title: "",
    description: "",
    assigned_to: user?.user_id,
    status: "todo",
    start_date: "",
    end_date: "",
    tags: null,
    priority: "low",
    created_by: user?.user_id,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Add create task mutation
  const createTaskMutation = useCreateTask();

  const handleOk = () => {
    createTaskMutation.mutate(newTask);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateTask = () => {
    setIsModalVisible(true);
  };

  const groupedTasks: {
    [key: string]: Task[] | undefined;
  } = {
    todo: tasks?.filter((task) => task.status === "todo"),
    developing: tasks?.filter((task) => task.status === "developing"),
    done: tasks?.filter((task) => task.status === "done"),
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 opacity-0">
        skjdvfjkdhbodlhbivspk;ldjk;sdlvj;sdolv;lsdv
        dlfkgjldfpjgpdflkjbghwdokjsbga;lkgvqpbdfk''aklvs
      </h1>
      <div className="flex flex-col justify-between items-center mb-4 w-full">
        <h1 className=" font-bold mb-4 w-full">Dashboard</h1>
        <p className="mb-2">
          <Typewriter
            options={{ loop: true }}
            onInit={(typewriter: TypewriterClass) => {
              typewriter
                .typeString("View all the tasks here!")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Create, edit, and delete any task!")
                .start();
            }}
          />
        </p>
        <Button
          onClick={handleCreateTask}
          disabled={createTaskMutation.isPending}
          className="flex items-center gap-2 w-full"
        >
          <Plus className="h-4 w-4" />
          {createTaskMutation.isPending ? "Creating..." : "Create Task"}
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["todo", "developing", "done"]}
        className="w-full"
      >
        {Object.keys(groupedTasks).map((status) => (
          <AccordionItem value={status} key={status}>
            <AccordionTrigger className="w-full">
              {status.replace("_", " ").toUpperCase()}
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <Table className="mb-4 w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedTasks[status]?.map((task) => (
                    <TaskTableRow key={task.task_id} task={task} />
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
        <DialogTrigger asChild>
          <Button className="hidden">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <Input
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleStatusChange}
              className="mb-2"
            />
            <Textarea
              name="description"
              rows={4}
              placeholder="Description"
              value={newTask.description}
              onChange={handleStatusChange}
              className="mb-2"
            />
            <Select
              defaultValue={newTask.assigned_to.toString()}
              onValueChange={(value) =>
                setNewTask({ ...newTask, assigned_to: parseInt(value) })
              }
            >
              <SelectTrigger>{newTask.assigned_to}</SelectTrigger>
              <SelectContent>
                {allUsers?.map((user) => (
                  <SelectItem
                    key={user.user_id}
                    value={user.user_id.toString()}
                  >
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              defaultValue={newTask.status}
              onValueChange={(value) =>
                setNewTask({ ...newTask, status: value })
              }
            >
              <SelectTrigger>{newTask.status}</SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="developing">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <>
              <p>Start Date</p>
              <DatePicker
                placeholder="Start Date"
                defaultValue={newTask.start_date}
                className="w-full mb-2"
                onValueChange={(date: string) =>
                  setNewTask({ ...newTask, start_date: date })
                }
              />
            </>
            <>
              <p>End Date</p>
              <DatePicker
                placeholder="End Date"
                defaultValue={newTask.end_date}
                className="w-full mb-2"
                onValueChange={(date: string) =>
                  setNewTask({ ...newTask, end_date: date })
                }
              />
            </>
            <Input
              name="tags"
              placeholder="Tags"
              value={newTask.tags || ""}
              onChange={handleStatusChange}
              className="mb-2"
            />
            <h3 className="font-bold mb-2">Subtasks</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {newTask.subtasks.map((subtask, index) => (
                  <TableRow key={index}>
                    <TableCell>{subtask.title}</TableCell>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={subtask.is_completed}
                        className="mb-1"
                        onChange={(e) => {
                          const updatedSubtasks = newTask.subtasks.map(
                            (st, i) =>
                              i === index
                                ? { ...st, is_completed: e.target.checked }
                                : st
                          );
                          setNewTask({
                            ...newTask,
                            subtasks: updatedSubtasks,
                          });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleOk} className="bg-blue-500 text-white">
              OK
            </Button>
            <Button onClick={handleCancel} className="bg-gray-500 text-white">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
