export interface Task {
  TaskID: number;
  Assignee: string;
  Title: string;
  Description: string;
  Status: string;
  Tags: string;
  StartDate: string;
  EndDate: string;
  Priority: string;
  CreatedBy: number;
  AssignedTo: number;
  Subtasks: Subtask[];
}

interface Subtask {
  SubtaskID: number;
  Title: string;
  IsCompleted: boolean;
}
