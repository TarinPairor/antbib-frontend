import { useGetAllTasks } from "@/apis/tasks";
import Centralizer from "@/components/centralizer";
import LoadingSpinner from "@/components/loading-spinner";
import { Task } from "@/interfaces/types";
import { formatDateTime } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Calendar() {
  const { data: allTasks, isPending } = useGetAllTasks();
  console.log(allTasks);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedTask, setSelectedTask] = useState<Task>({
    task_id: 0,
    title: "",
    description: "",
    status: "",
    tags: "",
    start_date: "",
    end_date: "",
    priority: "",
    assigned_to: 0,
    created_by: 0,
  });
  // Define 6-hour intervals
  const timeLabels = Array.from({ length: 25 }, (_, i) => {
    const hour = i % 12 || 12;
    return `${hour < 10 ? "0" : ""}${hour}:00 ${
      i < 12 || i === 24 ? "AM" : "PM"
    }`;
  });

  const generateDays = () => {
    const days = [];
    const monthStart = new Date(currentMonth);
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    let currentDate = monthStart;
    while (currentDate <= monthEnd) {
      days.push([
        currentDate.getDate().toString(),
        new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(currentDate),
        new Date(currentDate),
      ]);
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return days as [string, string, Date][];
  };

  const getTasksForRange = () => {
    return allTasks?.map((task) => {
      const startDate = task.start_date
        ? new Date(task.start_date)
        : // else end_date - 1 day
          new Date(
            new Date(task.end_date).setDate(
              new Date(task.end_date).getDate() - 1
            )
          );
      const endDate = new Date(task.end_date);

      return {
        ...task,
        displayStart: startDate,
        displayEnd: endDate,
        startDay: startDate.getDate(),
        endDay: endDate.getDate(),
      };
    });
  };

  const days = generateDays();
  const today = new Date();
  const tasksWithRanges = getTasksForRange();

  const isToday = (dayNum: string) => {
    return (
      today.getDate().toString() === dayNum &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleCellClick = (task: Task) => {
    setSelectedTask(task);
  };

  const formatTaskTime = (task: Task) => {
    if (task.start_date) {
      return `From ${formatDateTime(task.start_date)} to ${formatDateTime(
        task.end_date
      )}`;
    }
    return `Due by ${formatDateTime(task.end_date)}`;
  };

  if (isPending) {
    return (
      <Centralizer>
        <LoadingSpinner className="fill-purple-600" />
      </Centralizer>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className=" font-bold">Calendar</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                )
              )
            }
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            {"<"}
          </button>
          <h2 className="text-lg font-semibold">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
            }).format(currentMonth)}
          </h2>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1
                )
              )
            }
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="flex select-none text-xs w-full">
        {/* Time labels column */}
        <div className="flex flex-col w-20 flex-shrink-0">
          <div className="h-10 border border-gray-300 flex items-center justify-center bg-gray-50" />
          {timeLabels.slice(0, -1).map((label) => (
            <div
              key={label}
              className="h-10 flex items-center justify-center text-sm bg-gray-50"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Days and grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex min-w-full">
            {days.map((day) => (
              <div key={day[1]} className="flex-1 min-w-[75px]">
                <div
                  className={`h-10 border border-gray-300 flex flex-col items-center justify-center text-sm
                    ${isToday(day[0]) ? "bg-blue-50" : ""}`}
                >
                  <div
                    className={isToday(day[0]) ? "text-blue-500 font-bold" : ""}
                  >
                    {day[0]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(day[2]).toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </div>
                </div>
                <div className="relative">
                  {timeLabels.slice(0, -1).map((_, index) => (
                    <div key={index} className="h-10 border border-gray-300" />
                  ))}
                  <div className="absolute inset-0 flex">
                    {tasksWithRanges?.map((task, taskIndex) => {
                      const currentDate = day[2];
                      const taskStart = new Date(task.displayStart);
                      const taskEnd = new Date(task.displayEnd);

                      if (currentDate >= taskStart && currentDate <= taskEnd) {
                        return (
                          <div
                            key={task.task_id}
                            onClick={() => handleCellClick(task)}
                            className={`w-4 h-full mx-0.5 ${
                              [
                                "bg-blue-400",
                                "bg-green-400",
                                "bg-purple-400",
                                "bg-yellow-400",
                                "bg-red-400",
                                "bg-indigo-400",
                              ][taskIndex % 4]
                            } cursor-pointer hover:w-3 transition-all`}
                            title={task.title}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={selectedTask.task_id !== 0}
        onOpenChange={() =>
          setSelectedTask({
            task_id: 0,
            title: "",
            description: "",
            status: "",
            tags: "",
            start_date: "",
            end_date: "",
            priority: "",
            assigned_to: 0,
            created_by: 0,
          })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTask.title}</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-600 mb-4">
            {formatTaskTime(selectedTask)}
          </div>
          <p className="text-sm">{selectedTask.description}</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
