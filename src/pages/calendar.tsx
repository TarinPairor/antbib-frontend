import { useState } from "react";
import { useGetAllTasks } from "@/apis/tasks";
import dayjs from "dayjs";
import { Task } from "@/interfaces/types";

export default function Calendar() {
  const { data: tasks, isLoading, error } = useGetAllTasks();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  const getTasksForDate = (date: Date) => {
    if (!tasks) return [];
    return tasks.filter((task) => dayjs(task.end_date).isSame(date, "day"));
  };

  const generateDays = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    const days: Date[] = [];
    let currentDate = start;

    while (currentDate.isBefore(end, "day") || currentDate.isSame(end, "day")) {
      days.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day");
    }
    return days;
  };

  const monthStart = currentMonth.startOf("month");
  const monthEnd = currentMonth.endOf("month");
  const today = dayjs().startOf("day");
  const days = generateDays(monthStart, monthEnd);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Calendar</h1>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          {"<"}
        </button>
        <h2 className="text-lg font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          {">"}
        </button>
      </div>

      {isLoading ? (
        <div>Loading tasks...</div>
      ) : error ? (
        <div>Error loading tasks</div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {days.map((date) => {
            const tasksForDate = getTasksForDate(date);

            return (
              <div
                key={date.toISOString()}
                className={`border p-2 rounded-md aspect-square flex flex-col justify-between ${
                  today.isSame(date, "day") ? "bg-blue-200" : "bg-white"
                } hover:bg-gray-100 cursor-pointer`}
                onClick={() => handleDateClick(date)}
              >
                <div className="text-right text-sm font-semibold">
                  {dayjs(date).format("D")}
                </div>
                <div className="mt-2 space-y-1 flex-grow overflow-hidden">
                  {tasksForDate.map((task) => (
                    <div
                      key={task.task_id}
                      className="text-xs bg-blue-100 p-1 rounded-md truncate"
                    >
                      <div className="font-medium">{task.title}</div>
                      <div className="text-gray-600">
                        {dayjs(task.end_date).format("HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {dayjs(selectedDate).format("dddd, MMMM D, YYYY")}
          </h3>
          <div className="mt-2 space-y-2">
            {getTasksForDate(selectedDate).map((task: Task) => (
              <div
                key={task.task_id}
                className="border p-2 rounded-md bg-gray-50"
              >
                <div className="font-semibold">{task.title}</div>
                <div className="text-sm text-gray-600">
                  {task.start_date &&
                    `${dayjs(task.start_date).format("HH:mm")}`}
                  {" Til "}
                  {dayjs(task.end_date).format("HH:mm")}
                </div>
                <div className="text-sm">{task.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
