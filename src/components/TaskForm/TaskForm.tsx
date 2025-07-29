import { useState } from 'react';

import type { TaskFormProps } from '../../types/index.ts';

//  * Form with validation.  When I make a new form, assign unique ID, and check dates(limit 10 years)
//  * So include an area for output.
//  * Error handling
//  * user-friendly feedback
// need the info tasklistSummary

//   export interface Task {
//   taskId: number;
//   title: string;
//   description: string;
//   status: string;
//   priority: string;
//   dueDate: string;
// }

// export interface TaskFormProps {
//   tasklistSummary: DataSummaryType
//   taskOrNull: Task | null;
// }

// I need tasklistSummary to get the . . . value of new ID
// if there is no task, then . . . prepopulate?  Yes.

export const TaskForm = ({ tasklistSummary, task, newTask, onSubmitShowForm }: TaskFormProps) => {

  const [formData, setFormData] = useState(task);

  //console.log(`TaskForm newTask ${newTask}`);

  let buttonText = newTask ? "Submit Task" : "Edit Task";

  const handleSubmit = (event: any) => {
    console.log(event.target.value);
    onSubmitShowForm();
  }
  return (
    <div>
      <div>
        TaskForm
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="date" />
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  )
}