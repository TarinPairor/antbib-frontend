export const fakeUsers = [
  {
    user_id: 1,
    username: "admin",
    user_email: "admin@example.com",
  },
  {
    user_id: 2,
    username: "johndoe",
    user_email: "johndoe@example.com",
  },
];

export const fakeTasks = [
  {
    task_id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    status: "todo",
    tags: "meeting,urgent",
    start_date: "2023-10-01",
    end_date: "2023-10-15",
    priority: "high",
    created_by: 1,
    assigned_to: 1,
    // subtasks: [
    //   { subtask_id: 1, title: "Subtask 1", is_completed: false },
    //   { subtask_id: 2, title: "Subtask 2", is_completed: true },
    // ],
  },
  {
    task_id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    status: "developing",
    tags: "meeting,urgent",
    start_date: "2023-10-01",
    end_date: "2023-10-15",
    priority: "medium",
    created_by: 1,
    assigned_to: 2,
    // subtasks: [
    //   { subtask_id: 3, title: "Subtask 3", is_completed: false },
    //   { subtask_id: 4, title: "Subtask 4", is_completed: true },
    // ],
  },
  {
    task_id: 3,
    title: "Task 3",
    description: "Description for Task 3",
    status: "done",
    tags: "meeting,urgent",
    start_date: "2023-10-01",
    end_date: "2023-10-15",
    priority: "low",
    created_by: 1,
    assigned_to: 2,
    // subtasks: [
    //   { subtask_id: 5, title: "Subtask 5", is_completed: false },
    //   { subtask_id: 6, title: "Subtask 6", is_completed: true },
    // ],
  },
  {
    task_id: 4,
    title: "Task 4",
    description: "Description for Task 4",
    status: "done",
    tags: "meeting,urgent,important,todo,january,february,march,april,may,june,july,august,september,october,november,december",
    start_date: "2025-01-20",
    end_date: "2023-10-15",
    priority: "high",
    created_by: 1,
    assigned_to: 1,
    // subtasks: [
    //   { subtask_id: 7, title: "Subtask 7", is_completed: false },
    //   { subtask_id: 8, title: "Subtask 8", is_completed: true },
    // ],
  },
  {
    task_id: 5,
    title: "Task 5",
    description: "Description for Task 5",
    status: "developing",
    tags: "meeting",
    start_date: "2023-10-01",
    end_date: "2023-10-15",
    priority: "high",
    created_by: 1,
    assigned_to: 2,
    // subtasks: [
    //   { subtask_id: 9, title: "Subtask 9", is_completed: false },
    //   { subtask_id: 10, title: "Subtask 10", is_completed: true },
    // ],
  },
];

export const fakeSubtasks = [
  {
    subtask_id: 1,
    task_id: 1,
    title: "Subtask 1",
    is_completed: false,
  },
  {
    subtask_id: 2,
    task_id: 1,
    title: "Subtask 2",
    is_completed: true,
  },
  {
    subtask_id: 3,
    task_id: 2,
    title: "Subtask 3",
    is_completed: false,
  },
  {
    subtask_id: 4,
    task_id: 2,
    title: "Subtask 4",
    is_completed: true,
  },
  {
    subtask_id: 5,
    task_id: 3,
    title: "Subtask 5",
    is_completed: false,
  },
  {
    subtask_id: 6,
    task_id: 3,
    title: "Subtask 6",
    is_completed: true,
  },
  {
    subtask_id: 7,
    task_id: 4,
    title: "Subtask 7",
    is_completed: false,
  },
  {
    subtask_id: 8,
    task_id: 4,
    title: "Subtask 8",
    is_completed: true,
  },
  {
    subtask_id: 9,
    task_id: 5,
    title: "Subtask 9",
    is_completed: false,
  },
  {
    subtask_id: 10,
    task_id: 5,
    title: "Subtask 10",
    is_completed: true,
  },
];

export const fakeNotifications = [
  {
    notification_id: 1,
    user_id: 1,
    message: "Notification 1 for user 1",
    created_at: "2023-10-01T10:00:00Z",
    is_read: false,
  },
  {
    notification_id: 2,
    user_id: 2,
    message: "Notification 2 for user 2",
    created_at: "2023-10-01T11:00:00Z",
    is_read: true,
  },
];
