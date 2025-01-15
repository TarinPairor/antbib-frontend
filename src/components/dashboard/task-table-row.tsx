import { useState } from "react";
import {
  TableRow,
  TableCell,
  Table,
  TableHeader,
  TableBody,
  TableHead,
} from "@/components/ui/table";
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

interface TaskTableRowProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
}

export default function TaskTableRow({ task, onUpdate }: TaskTableRowProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onUpdate(editedTask);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleStatusChange = (value: string) => {
    setEditedTask({ ...editedTask, Status: value });
  };

  //   const handleTagsChange = (value: string[]) => {
  //     setEditedTask({ ...editedTask, Tags: value.join(",") });
  //   };

  return (
    <>
      <TableRow key={task.TaskID}>
        <TableCell>{task.Title}</TableCell>
        <TableCell>{task.Description}</TableCell>
        <TableCell>
          <Badge
            variant={`${
              task.Status === "todo"
                ? "red"
                : task.Status === "developing"
                ? "yellow"
                : "green"
            }`}
          >
            {task.Status}
          </Badge>
        </TableCell>
        <TableCell>{task.Priority}</TableCell>
        <TableCell>
          {task.Tags.split(",").map((tag) => (
            <Badge key={tag} className="bg-gray-200 text-gray-800 p-1 m-1">
              {tag}
            </Badge>
          ))}
        </TableCell>
        <TableCell>
          <Button onClick={showModal} className="bg-blue-500 text-white">
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
              name="Title"
              placeholder="Title"
              value={editedTask.Title}
              onChange={handleChange}
              className="mb-2"
            />
            <Textarea
              name="Description"
              rows={4}
              placeholder="Description"
              value={editedTask.Description}
              onChange={handleChange}
              className="mb-2"
            />
            <Select
              defaultValue={editedTask.Assignee}
              onValueChange={(value) =>
                setEditedTask({ ...editedTask, Assignee: value })
              }
            >
              <SelectTrigger>{editedTask.Assignee}</SelectTrigger>
              <SelectContent>
                <SelectItem value="John Doe">Tarin</SelectItem>
                <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                <SelectItem value="John Smith">John Smith</SelectItem>
              </SelectContent>
            </Select>

            <Select
              defaultValue={editedTask.Status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>{editedTask.Status}</SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="developing">Developing</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <DatePicker
            //   placeholder="Start Date"
            //   defaultValue={editedTask.StartDate}
            //   className="w-full mb-2"
            />
            <DatePicker
            //   placeholder="End Date"
            //   defaultValue={editedTask.EndDate}
            //   className="w-full mb-2"
            />
            <Select
            //   mode="tags"
            //   className="w-full mb-2"
            //   placeholder="Tags"
            //   defaultValue={editedTask.Tags.split(",")}
            //   onValueChange={handleTagsChange}
            ></Select>
            <h3 className="font-bold mb-2">Subtasks</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editedTask.Subtasks.map((subtask) => (
                  <TableRow key={subtask.SubtaskID}>
                    <TableCell>{subtask.Title}</TableCell>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={subtask.IsCompleted}
                        className="mb-1"
                        onChange={(e) => {
                          const updatedSubtasks = editedTask.Subtasks.map(
                            (st) =>
                              st.SubtaskID === subtask.SubtaskID
                                ? { ...st, IsCompleted: e.target.checked }
                                : st
                          );
                          setEditedTask({
                            ...editedTask,
                            Subtasks: updatedSubtasks,
                          });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
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
    </>
  );
}
