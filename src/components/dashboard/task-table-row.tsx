import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task } from "@/interfaces/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteTask, useUpdateTask } from "@/apis/tasks";
import { useGetAllUsers, useGetUserById } from "@/apis/users";
import { textWithEllipsis } from "@/lib/utils";
import { useCreateNotification } from "@/apis/notifications";

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

  const validateAndUpdateTime = (
    value: string,
    max: number,
    setter: (value: string) => void
  ) => {
    let numValue = parseInt(value);
    if (value === "") {
      setter("00");
      return;
    }
    if (isNaN(numValue)) return;

    numValue = Math.max(0, Math.min(numValue, max));
    setter(numValue.toString().padStart(2, "0"));

    // If date is null, use current date as base
    const newDate = date ? new Date(date) : new Date();
    newDate.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
    onChange(newDate.toISOString());
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <Input
          type="number"
          min={0}
          max={23}
          value={hours}
          onChange={(e) => validateAndUpdateTime(e.target.value, 23, setHours)}
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
            validateAndUpdateTime(e.target.value, 59, setMinutes)
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
            validateAndUpdateTime(e.target.value, 59, setSeconds)
          }
          className="w-16 text-center"
          placeholder="SS"
        />
      </div>
    </div>
  );
};

interface TaskTableRowProps {
  task: Task;
}

const tagColors = [
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-green-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400",
];

const getRandomColorClass = () => {
  return tagColors[Math.floor(Math.random() * tagColors.length)];
};

export default function TaskTableRow({ task }: TaskTableRowProps) {
  const { data: allUsers } = useGetAllUsers();
  const { data: user } = useGetUserById(task.assigned_to);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const createNotification = useCreateNotification();

  const handleOk = () => {
    updateTask(editedTask);

    if (editedTask.assigned_to !== user?.user_id) {
      createNotification.mutate({
        user_id: editedTask.assigned_to,
        message: `You have been assigned a new task: ${editedTask.title}`,
      });
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    deleteTask(editedTask.task_id);
    setIsModalVisible(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleStatusChange = (value: string) => {
    setEditedTask({ ...editedTask, status: value });
  };

  const handleAssigneeChange = (value: string) => {
    setEditedTask({ ...editedTask, assigned_to: parseInt(value) });
  };

  // const handleTimeChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   dateType: "start_date" | "end_date"
  // ) => {
  //   const { value } = e.target;
  //   const date = new Date(editedTask[dateType]);
  //   const [hours, minutes, seconds] = value.split(":").map(Number);

  //   date.setHours(hours, minutes, seconds);
  //   setEditedTask({ ...editedTask, [dateType]: date.toISOString() });
  // };

  return (
    <>
      <TableRow key={task.task_id}>
        <TableCell>{textWithEllipsis(task.title, 90)}</TableCell>
        <TableCell>{textWithEllipsis(task.description)}</TableCell>
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
        <TableCell>{user?.username}</TableCell>
        <TableCell>
          {task?.tags
            ?.split(",")
            .slice(0, 1)
            .map((tag) => (
              <Badge key={tag} className={`${getRandomColorClass()} p-1 m-1`}>
                {tag}
              </Badge>
            ))}
          ...
        </TableCell>
        <TableCell>
          <Button onClick={showModal} className="bg-black text-white">
            Edit
          </Button>
        </TableCell>
      </TableRow>

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
              value={editedTask.title}
              onChange={handleChange}
              className="mb-2"
            />
            <Textarea
              name="description"
              rows={4}
              placeholder="Description"
              value={editedTask.description}
              onChange={handleChange}
              className="mb-2"
            />
            <p>Assigned To</p>
            <Select
              defaultValue={task?.assigned_to?.toString()}
              onValueChange={handleAssigneeChange}
            >
              <SelectTrigger>{user?.username}</SelectTrigger>
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
            <p>Status</p>
            <Select
              defaultValue={editedTask.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>{editedTask.status}</SelectTrigger>
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
                defaultValue={editedTask.start_date}
                className="w-full mb-2"
                onValueChange={(date: string) =>
                  setEditedTask({ ...editedTask, start_date: date })
                }
              />
              <TimeSelector
                date={editedTask.start_date}
                onChange={(date: string) =>
                  setEditedTask({ ...editedTask, start_date: date })
                }
                className="mb-2"
              />
            </>
            <>
              <p>End Date</p>
              <DatePicker
                placeholder="End Date"
                defaultValue={editedTask.end_date}
                className="w-full mb-2"
                onValueChange={(date: string) =>
                  setEditedTask({ ...editedTask, end_date: date })
                }
              />
              <TimeSelector
                date={editedTask.end_date}
                onChange={(date: string) =>
                  setEditedTask({ ...editedTask, end_date: date })
                }
                className="mb-2"
              />
            </>
            <p>Tags</p>
            <Input
              name="tags"
              placeholder="Tags"
              value={editedTask.tags || ""}
              onChange={handleChange}
              className="mb-2"
            />
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleOk} className="bg-blue-500 text-white">
              OK
            </Button>
            <Button onClick={handleDelete} className="bg-gray-500 text-white">
              Delete
            </Button>
            <Button onClick={handleCancel} className="bg-gray-500 text-white">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
