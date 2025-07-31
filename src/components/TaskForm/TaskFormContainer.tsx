import { useState } from 'react';

import type { Task, TaskFormContainerProps } from '../../types/index.ts';
import { TaskForm } from './TaskForm';

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
    <div className='taskformcontainer'>
      {showForm ? null : <button onClick={() => handleToggleShowForm()}>{buttonText}</button>}
      {showForm ? <TaskForm tasklistSummary={tasklistSummary} task={taskData} newTask={newTask} onToggleShowForm={handleToggleShowForm} onSubmitFormTask={onSubmitFormTask} /> : null}
    </div>
  )
}