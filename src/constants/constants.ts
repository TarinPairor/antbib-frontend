export const fakeUsers = [
  {
    UserID: 1,
    Username: "admin",
    PasswordHash: "hashedpassword1",
  },
  {
    UserID: 2,
    Username: "johndoe",
    PasswordHash: "hashedpassword2",
  },
];

export const fakeTasks = [
  {
    TaskID: 1,
    Assignee: "John Doe",
    Title: "Task 1",
    Description: "Description for Task 1",
    Status: "todo",
    Tags: "meeting,urgent",
    StartDate: "2025-10-01",
    EndDate: "",
    Priority: "high",
    CreatedBy: 1,
    AssignedTo: 1,
    Subtasks: [
      { SubtaskID: 1, Title: "Subtask 1", IsCompleted: false },
      { SubtaskID: 2, Title: "Subtask 2", IsCompleted: true },
    ],
  },
  {
    TaskID: 2,
    Title: "Task 2",
    Assignee: "John Doe",
    Description: "Description for Task 2",
    Status: "developing",
    Tags: "meeting,urgent",
    StartDate: "2025-10-01",
    EndDate: "2025-10-15",
    Priority: "medium",
    CreatedBy: 1,
    AssignedTo: 2,
    Subtasks: [
      { SubtaskID: 3, Title: "Subtask 3", IsCompleted: false },
      { SubtaskID: 4, Title: "Subtask 4", IsCompleted: true },
    ],
  },
  {
    TaskID: 3,
    Title: "Task 3",
    Assignee: "Tarin",
    Description: "Description for Task 3",
    Status: "done",
    Tags: "meeting,urgent",
    StartDate: "2025-10-01",
    EndDate: "2025-10-15",
    Priority: "low",
    CreatedBy: 1,
    AssignedTo: 2,
    Subtasks: [
      { SubtaskID: 5, Title: "Subtask 5", IsCompleted: false },
      { SubtaskID: 6, Title: "Subtask 6", IsCompleted: true },
    ],
  },
  {
    TaskID: 4,
    Title: "Task 4",
    Assignee: "Tarin",
    Description: "Description for Task 4",
    Status: "done",
    Tags: "meeting,urgent,important,todo,january,february,march,april,may,june,july,august,september,october,november,december",
    StartDate: "2025-01-20",
    EndDate: "2025-10-15",
    Priority: "high",
    CreatedBy: 1,
    AssignedTo: 1,
    Subtasks: [
      { SubtaskID: 7, Title: "Subtask 7", IsCompleted: false },
      { SubtaskID: 8, Title: "Subtask 8", IsCompleted: true },
    ],
  },
  {
    TaskID: 5,
    Title: "Task 5",
    Assignee: "Tarin",
    Description: "Description for Task 4",
    Status: "developing",
    Tags: "meeting",
    StartDate: "2025-10-01",
    EndDate: "2025-10-15",
    Priority: "high",
    CreatedBy: 1,
    AssignedTo: 2,
    Subtasks: [
      { SubtaskID: 7, Title: "Subtask 7", IsCompleted: false },
      { SubtaskID: 8, Title: "Subtask 8", IsCompleted: true },
    ],
  },
];

export const fakeSubtasks = [
  {
    SubtaskID: 1,
    TaskID: 1,
    Title: "Subtask 1",
    IsCompleted: false,
  },
  {
    SubtaskID: 2,
    TaskID: 1,
    Title: "Subtask 2",
    IsCompleted: true,
  },
  {
    SubtaskID: 3,
    TaskID: 2,
    Title: "Subtask 3",
    IsCompleted: false,
  },
  {
    SubtaskID: 4,
    TaskID: 2,
    Title: "Subtask 4",
    IsCompleted: true,
  },
  {
    SubtaskID: 5,
    TaskID: 3,
    Title: "Subtask 5",
    IsCompleted: false,
  },
  {
    SubtaskID: 6,
    TaskID: 3,
    Title: "Subtask 6",
    IsCompleted: true,
  },
  {
    SubtaskID: 7,
    TaskID: 4,
    Title: "Subtask 7",
    IsCompleted: false,
  },
  {
    SubtaskID: 8,
    TaskID: 4,
    Title: "Subtask 8",
    IsCompleted: true,
  },
];

export const fakeNotifications = [
  {
    NotificationID: 1,
    UserID: 1,
    Message: "Notification 1 for user 1",
    CreatedAt: "2025-01-01T10:00:00Z",
    IsRead: false,
  },
  {
    NotificationID: 2,
    UserID: 2,
    Message: "Notification 2 for user 2",
    CreatedAt: "2025-01-01T11:00:00Z",
    IsRead: true,
  },
];
