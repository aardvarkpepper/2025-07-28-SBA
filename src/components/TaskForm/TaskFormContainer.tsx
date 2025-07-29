import { useState } from 'react';

import type { Task, TaskFormContainerProps } from '../../types/index.ts';
import { TaskForm } from './TaskForm';

// export interface TaskFormContainerProps {
//   tasklistSummary: DataSummaryType
//   taskOrNull: Task | null;
// }

//   export interface Task {
//   taskId: number;
//   title: string;
//   description: string;
//   status: string;
//   priority: string;
//   dueDate: string;
// }

// If I have a task, then I populate with that to taskform.  If not, then I supply a default task.

// so the taskformcontainer takes a parameter that accepts Task or null.  But when it sends out the prop to taskform, it is ALWAYS a task.  If I'm calling this from a Task, then I populate with Task there; if I'm calling this from Dashboard, then I populate with the default task.  hm.  Right.  But to populate that, I need tasklistSummary[1].

export const TaskFormContainer = ({ tasklistSummary, taskOrNull }: TaskFormContainerProps) => {
  const [showForm, setShowForm] = useState(false);

  const todaysDate = new Date().toISOString().slice(0, 10);
  //console.log(`TaskFormContainer taskorNull ${!!taskOrNull}`)

  let task = taskOrNull;
  let buttonText = "Edit Task";
  let newTask = false;

  const handleShowForm = () => {
    setShowForm(prev => !prev);
  }

  if (!taskOrNull) { // if no task was passed in
    task = {
      taskId: tasklistSummary[1] + 1,
      title: "",
      description: "",
      status: "",
      priority: "",
      dueDate: todaysDate,
    }
    buttonText = "Add Task";
    newTask = true;
  }

  return (
    <>
    <div>Taskform Container</div>
    {showForm ? null : <button onClick={() => handleShowForm()}>{buttonText}</button>}
    {showForm ? <TaskForm tasklistSummary={tasklistSummary} task={(task as Task)} newTask={newTask} onSubmitShowForm={handleShowForm}/> : null}
    </>
  )
}