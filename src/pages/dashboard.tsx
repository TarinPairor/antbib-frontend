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
import React, { useState } from "react";
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
import Centralizer from "@/components/centralizer";
import LoadingSpinner from "@/components/loading-spinner";
import { useEffect } from "react";

const formatDateToCustomString = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const TimeSelector = ({
  date,
  onChange,
  className = "",
}: {
  date: string | null;
  onChange: (date: string) => void;
  className?: string;
}) => {
  // Initialize with current time if date is null
  const timeDate = date ? new Date(date) : new Date();
  const [hours, setHours] = React.useState(
    timeDate.getHours().toString().padStart(2, "0")
  );
  const [minutes, setMinutes] = React.useState(
    timeDate.getMinutes().toString().padStart(2, "0")
  );
  const [seconds, setSeconds] = React.useState(
    timeDate.getSeconds().toString().padStart(2, "0")
  );

  // Update time whenever date changes
  useEffect(() => {
    if (date) {
      const newDate = new Date(date);
      setHours(newDate.getHours().toString().padStart(2, "0"));
      setMinutes(newDate.getMinutes().toString().padStart(2, "0"));
      setSeconds(newDate.getSeconds().toString().padStart(2, "0"));
    }
  }, [date]);

  const validateAndUpdateTime = (
    value: string,
    max: number,
    setter: (value: string) => void,
    timeType: "hours" | "minutes" | "seconds"
  ) => {
    let numValue = parseInt(value);
    if (value === "") {
      setter("00");
      return;
    }
    if (isNaN(numValue)) return;

    numValue = Math.max(0, Math.min(numValue, max));
    setter(numValue.toString().padStart(2, "0"));

    const baseDate = date ? new Date(date) : new Date();
    const currentHours = timeType === "hours" ? numValue : parseInt(hours);
    const currentMinutes =
      timeType === "minutes" ? numValue : parseInt(minutes);
    const currentSeconds =
      timeType === "seconds" ? numValue : parseInt(seconds);

    baseDate.setHours(currentHours, currentMinutes, currentSeconds);
    const formattedDate = formatDateToCustomString(baseDate);

    onChange(formattedDate);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <Input
          type="number"
          min={0}
          max={23}
          value={hours}
          onChange={(e) =>
            validateAndUpdateTime(e.target.value, 23, setHours, "hours")
          }
          className="w-16 text-center"
          placeholder="HH"
        />
        <span className="text-gray-500">:</span>
        <Input
          type="number"
          min={0}
          max={59}
          value={minutes}
          onChange={(e) =>
            validateAndUpdateTime(e.target.value, 59, setMinutes, "minutes")
          }
          className="w-16 text-center"
          placeholder="MM"
        />
        <span className="text-gray-500">:</span>
        <Input
          type="number"
          min={0}
          max={59}
          value={seconds}
          onChange={(e) =>
            validateAndUpdateTime(e.target.value, 59, setSeconds, "seconds")
          }
          className="w-16 text-center"
          placeholder="SS"
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const clerkUser = useUser().user;
  const userEmail = clerkUser?.primaryEmailAddress?.emailAddress;
  const { data: user = fakeUsers[0] } = useGetUserByEmail(
    userEmail || "e1075551@u.nus.edu"
  );
  const { data: tasks, isPending: isTasksPending } = useGetAllTasks();
  const { data: allUsers, isPending: isUsersPending } = useGetAllUsers();
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
    createTaskMutation.mutate({
      ...newTask,
      start_date: newTask.start_date || newTask.end_date,
    });
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

  if (isTasksPending || isUsersPending) {
    return (
      <Centralizer className="top-1/2">
        <LoadingSpinner className="fill-green-500" />
      </Centralizer>
    );
  }

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
        {userEmail && (
          <Button
            onClick={handleCreateTask}
            disabled={createTaskMutation.isPending}
            className="flex items-center gap-2 w-full"
          >
            <Plus className="h-4 w-4" />
            {createTaskMutation.isPending ? "Creating..." : "Create Task"}
          </Button>
        )}
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
              required
            />
            <Textarea
              name="description"
              rows={3}
              placeholder="Description"
              value={newTask.description}
              onChange={handleStatusChange}
              className="mb-2"
              required
            />
            <p>Assign To</p>
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
                    {user.user_email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p>Status</p>
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
                onValueChange={(date: string) => {
                  const currentDate = date ? new Date(date) : new Date();
                  const formattedDate = formatDateToCustomString(currentDate);
                  setNewTask({ ...newTask, end_date: formattedDate });
                }}
              />
              <TimeSelector
                date={newTask.start_date}
                onChange={(date: string) =>
                  setNewTask({ ...newTask, start_date: date })
                }
                className="mb-2"
              />
            </>
            <>
              <p>End Date (Required)</p>
              <DatePicker
                placeholder="End Date"
                defaultValue={newTask.end_date}
                className="w-full mb-2"
                onValueChange={(date: string) => {
                  const currentDate = date ? new Date(date) : new Date();
                  const formattedDate = formatDateToCustomString(currentDate);
                  setNewTask({ ...newTask, end_date: formattedDate });
                }}
              />
              <TimeSelector
                date={newTask.end_date}
                onChange={(date: string) =>
                  setNewTask({ ...newTask, end_date: date })
                }
                className="mb-2"
              />
            </>
            <Input
              name="tags"
              placeholder="Tags"
              value={newTask.tags || ""}
              onChange={handleStatusChange}
              className="mb-2"
            />
            {/* <h3 className="font-bold mb-2">Subtasks</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newTask.subtasks.map((subtask, index) => (
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
                ))}
              </TableBody>
            </Table> */}
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
