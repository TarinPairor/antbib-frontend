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
import { useUpdateTask } from "@/apis/tasks";
import { useGetAllUsers } from "@/apis/users";
import { textWithEllipsis } from "@/lib/utils";

interface TaskTableRowProps {
  task: Task;
}

export default function TaskTableRow({ task }: TaskTableRowProps) {
  // console.log(task);
  const { data: allUsers } = useGetAllUsers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const { mutate: updateTask } = useUpdateTask();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    updateTask(editedTask);
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
    // updateTask({ ...editedTask, [name]: value });
  };

  const handleStatusChange = (value: string) => {
    setEditedTask({ ...editedTask, status: value });
    // updateTask({ ...editedTask, status: value });
  };

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
        <TableCell>{task.priority}</TableCell>
        <TableCell>
          {task?.tags
            ?.split(",")
            .slice(0, 1)
            .map((tag) => (
              <Badge key={tag} className="bg-gray-200 text-gray-800 p-1 m-1">
                {tag}
              </Badge>
            ))}
          ...
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
            <Select
            // defaultValue={editedTask.assigned_to.toString()}
            // onValueChange={(value) =>
            //   setEditedTask({ ...editedTask, assigned_to: parseInt(value) })
            // }
            >
              <SelectTrigger>{editedTask.assigned_to}</SelectTrigger>
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
            </>
            <Input
              name="tags"
              placeholder="Tags"
              value={editedTask.tags}
              onChange={handleChange}
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
                {/* {editedTask.subtasks.map((subtask) => (
                  <TableRow key={subtask.subtask_id}>
                    <TableCell>{subtask.title}</TableCell>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={subtask.is_completed}
                        className="mb-1"
                        onChange={(e) => {
                          const updatedSubtasks = editedTask.subtasks.map(
                            (st) =>
                              st.subtask_id === subtask.subtask_id
                                ? { ...st, is_completed: e.target.checked }
                                : st
                          );
                          setEditedTask({
                            ...editedTask,
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
    </>
  );
}
