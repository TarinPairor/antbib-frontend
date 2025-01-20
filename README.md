# Task Management System (AntBib)

## Overview

"AntBib" symbolizes 2 things: Ants, which are known for their teamwork and efficiency, and Bibliography, which represents the academic and literary focus of the project.
These two concepts are combined to create a task management system that is efficient, collaborative, and tailored for single academic organizations.
This project is a comprehensive task and meeting management system designed for enhanced productivity and streamlined operations. It is tailored to meet the needs of organizations, including support for multilingual tasks and grant management integration.

## Features

### Core Features

1. **Task Scheduling**: Arrange tasks or meetings with authors, publishers, and event partners.
2. **Send Follow-Ups**: Send follow-up tasks to collaborators or team members post-meetings.
3. **Reminders and Notifications**: Automate reminders when you are assigned a task or when a deadline is approaching.
4. **Email Thread Summaries**: Generate concise summaries of email discussions for efficient decision-making.

---

## User Stories

1. **Task Management**:
   - As a user, I can create tasks with timelines, assign them to others, and mark them as complete.
   - I can view tasks in different statuses: To-Do, Developing, Done, and Overdue.
   - I can filter tasks by tags, priority, and dates.
2. **Dashboard**:
   - As a user, I can view a large dashboard with a categorized list of tasks and meetings.
   - Tasks are tagged with statuses and display upcoming deadlines.
3. **Notifications**:
   - I can receive notifications for new assignments and updates.
   - I can rack overdue or upcoming tasks using badges and reminders.
4. **Calendar View**:
   - I can visualize tasks in a calendar format and filter tasks by spaces or assignees.
5. **Task Details**:
   - I can click on tasks to view and edit details such as title, description, status, tags, and assignees.
6. **Email Summary**:
   - I can copy and paste email threads for AI-generated summaries.

---

### Pages

1. `/` - Home Page:
   - Displays your todo, in-progress, and completed tasks.
   - Allows you to view all tasks.
   - Allows you to view upcoming tasks (tasks with due dates/end dates coming up).
   - Allows you to view tasks filtered by tags.
2. `/inbox` - Notifications Page:
   - Displays notifications for newly assigned tasks.
3. `/calendar` - Calendar Page:
   - Displays all tasks in a calendar format.
4. `/dashboard` - Dashboard Page:
   - Displays all tasks in a categorized list.
5. `/email-thread-summarizer` - Email Summary Page:
   - Allows you to paste email threads for AI-generated summaries.

### Creating Tasks

In the `/dashboard` page, you can create tasks by clicking on the `Create Task` button at the top of the screen. You can then fill in the task details, including the title, description, status, tags, start date, end date, priority, and assignee. Once you have filled in the details, you can click on the `Ok` button to create the task. You can only create tasks once signed in!

- Tags: Tags are used to categorize tasks and make them easier to filter. You can add multiple tags to a task by separating them with commas ie `urgent,meeting`.

### Updating Tasks

In the `/dashboard` page, you can update tasks by clicking on the `Edit` button next to the task you want to update. You can then edit the task details and click on the `Ok` button to save the changes. If you assign someone to a task, they will receive a notification in their inbox. You can also delete tasks by clicking the delete button. You can only edit tasks once signed in!

### Viewing Tasks

On the home page `/`, you can view all of the tasks assigned to you. You can filter your task statuses at the top by toggling the tabs and seeing their relevant details.

## Tech stack:
**Frontend**: React Vite Typescript, TailwindCSS, ShadCN
**Backend**: Express Typescript
**Database**: Supabase

## Database Schema

### User Table

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50), -- Customizable username
    user_email VARCHAR(255) NOT NULL UNIQUE -- Clerk-managed email
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'todo', -- todo, in_progress, done
    tags TEXT, -- comma-separated tags like 'meeting,urgent'
    start_date DATE, -- Can be NULL for open-ended tasks
    end_date DATE NOT NULL,
    priority VARCHAR(20), -- e.g., low, medium, high
    created_by INT REFERENCES antbib_users(user_id) ON DELETE CASCADE,
    assigned_to INT REFERENCES antbib_users(user_id) ON DELETE SET NULL
);

CREATE TABLE subtasks (
    subtask_id SERIAL PRIMARY KEY,
    task_id INT REFERENCES antbib_tasks(task_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE
);

```

## Application Flow

- **User Login/Signup**:
  - Users log in or sign up with their email and password.
- **Dashboard**:
  - Displays categorized tasks and meetings (e.g., `todo`, `developing`, `done`).
- **Home**:
  - Allows users to view their own tasks, including assignees, and tags.
- **Notifications**:
  - Provides updates on task changes or assignments.
- **Calendar View**:
  - Visualizes tasks and deadlines.

## Future Enhancements

- **Spaces**: Create separate spaces for individual subgroups.
- **Task Assignment**: Allow tasks to be assigned to multiple users.
- **Enhanced Filters**: Add more filters for tasks and calendar views.
- **Calendar Integration**: Add better calendar integration and UI for task visualization.
- **Subtasks**: Add subtasks for each task.
- **Using email as an identifier**: Current using the backend randomly generated ID but it makes more sense to use the email account.

Get the link to the project [here](https://antbib.vercel.app/)!
