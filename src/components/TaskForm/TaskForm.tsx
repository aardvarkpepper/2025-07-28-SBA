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

// Add a close button.

export const TaskForm = ({ tasklistSummary, task, newTask, onToggleShowForm, onSubmitFormTask}: TaskFormProps) => { // onSubmitFormTask has different functionality depending on where it's invoked from.

  const [formData, setFormData] = useState(task);

  let buttonText = newTask ? "Submit New Task" : "Edit Task";

  const handleSubmitForm = (event: any) => {
    event.preventDefault()
    //console.log(`TaskForm handleSubmitForm attempted.`);
    
    onSubmitFormTask(formData);
    onToggleShowForm();
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prev => ({...prev, [name]: value})) // must wrap ...prev, [name]: value in ().
    // note partial date input may trigger validation error (?).
  }

  return (
    <div>
      <div className='taskform'>
        {buttonText}
      </div>
      <button onClick={() => onToggleShowForm()}>X</button>
      <form onSubmit={(event) => handleSubmitForm(event)}>
        <label htmlFor='title'>Title:</label>
        <input type="text" id='title' name='title' value={formData.title} onChange={handleChange}/>
        <br />
        <label htmlFor='description'>Description:</label>
        <input type="text" id='description' name='description' value={formData.description} onChange={handleChange}/>
        <br />
        <label htmlFor='status'>Status:</label>
        <input type="text" id='status' name='status' value={formData.status} onChange={handleChange}/>
        <br />
        <label htmlFor='priority'>Priority:</label>
        <input type="text" id='priority' name='priority' value={formData.priority} onChange={handleChange}/>
        <br />
        <label htmlFor='dueDate'>Due Date:</label>
        <input type="date" id='date' name='dueDate' value={formData.dueDate} onChange={handleChange}/>
        <br />
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  )
}