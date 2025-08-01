import React, { useState } from 'react';

import type { Task, TaskFormContainerProps } from '../../types/index.ts';
import { TaskForm } from './TaskForm';

export const TaskFormContainer: React.FunctionComponent<TaskFormContainerProps> = ({ tasklistSummary, taskOrNull, onSubmitFormTask }: TaskFormContainerProps): React.ReactNode => {

  const todaysDate = new Date().toISOString().slice(0, 10);
  const newTaskData: Task = {
    taskId: tasklistSummary[1] + 1,
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: todaysDate,
  }
  const taskData: Task = taskOrNull ? taskOrNull : newTaskData;
  let buttonText: string = "Edit Task";
  let newTask: boolean = false;

  if (!taskOrNull) { // if no task was passed in
    buttonText = "Add Task";
    newTask = true;
  }

  const [showForm, setShowForm] = useState<boolean>(false);
  const handleToggleShowForm: () => void = ():void => {
    setShowForm(prev => !prev);
  }

  return (
    <div className='taskformcontainer'>
      {showForm ? null : <button onClick={() => handleToggleShowForm()}>{buttonText}</button>}
      {showForm ? <TaskForm tasklistSummary={tasklistSummary} task={taskData} newTask={newTask} onToggleShowForm={handleToggleShowForm} onSubmitFormTask={onSubmitFormTask} /> : null}
    </div>
  )
}