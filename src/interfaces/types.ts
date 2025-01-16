export interface Task {
  task_id: number;
  title: string;
  description: string;
  status: string;
  tags: string | null;
  start_date: string;
  end_date: string;
  priority: string;
  created_by: number;
  assigned_to: number;
  // subtasks: Subtask[];
}

export interface Subtask {
  subtask_id: number;
  title: string;
  is_completed: boolean;
}

export interface Notification {
  notification_id: number;
  user_id: number;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface User {
  user_id: number;
  username: string;
  user_email: string;
}
