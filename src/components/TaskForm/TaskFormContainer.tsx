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

export const TaskFormContainer = ({ tasklistSummary, taskOrNull, onSubmitFormTask }: TaskFormContainerProps) => {

  const todaysDate = new Date().toISOString().slice(0, 10);
  const newTaskData = {
    taskId: tasklistSummary[1] + 1,
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: todaysDate,
  }
  const taskData = taskOrNull ? taskOrNull : newTaskData;
  let buttonText = "Edit Task";
  let newTask = false;

  if (!taskOrNull) { // if no task was passed in
    buttonText = "Add Task";
    newTask = true;
  }
  
  const [showForm, setShowForm] = useState(false);
 
  const handleToggleShowForm = () => {
    setShowForm(prev => !prev);
  }

  return (
    <>
      <div>Taskform Container</div>
      {showForm ? null : <button onClick={() => handleToggleShowForm()}>{buttonText}</button>}
      {showForm ? <TaskForm tasklistSummary={tasklistSummary} task={taskData} newTask={newTask} onToggleShowForm={handleToggleShowForm} onSubmitFormTask={onSubmitFormTask}/> : null}
    </>
  )
}