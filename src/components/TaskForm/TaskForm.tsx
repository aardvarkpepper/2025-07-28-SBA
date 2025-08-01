import { useState } from 'react';

import type { Task, TaskFormProps } from '../../types/index.ts';

export const TaskForm: React.FunctionComponent<TaskFormProps> = ({ task, newTask, onToggleShowForm, onSubmitFormTask }: TaskFormProps): React.ReactNode => { // onSubmitFormTask has different functionality depending on where it's invoked from.

  const [formData, setFormData] = useState<Task>(task);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");

  let buttonText = newTask ? "Submit New Task" : "Edit Task";

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValidationErrorArray: string[] = [];
    let errorMessage: string = "";
    let formDataDeepCopy: Task = { ...formData };
    /**
     * Though formDataDeepCopy is of type Task, iterating through using for const each in formDataDeepCopy is read as a string.  This is similar to an issue elsewhere where Object.keys was used; Typescript assumes the return is of string type.  However, a similar solution won't work here as each cannot be typed as keyof Task.
     * Variations including creating a new variable and assigning each as in
     * const hamster: keyof Task = each as keyof Task;
     * encounters error Type 'string' is not assignable to type 'never'.ts(2322). Attempting to nest inside if(formDataDeepCopy does nothing.  After all, Typescript assigns 'never' to types that are never supposed to occur.)
     * Attempting to use Object.keys encounters similar issues.
     */
    for (const each in formDataDeepCopy) {
      (formDataDeepCopy as any) = String((formDataDeepCopy as any)[each]).trim();
      if ((formDataDeepCopy as any)[each] === "") {
        formValidationErrorArray.push(each);
      }
    }
    try {
      if (formValidationErrorArray.length > 0) {
        errorMessage = `Fields may not be empty.  Please enter a value for key(s) ${formValidationErrorArray.join(" and ")}.  Empty spaces at beginning and end of entries are removed.`
        setFormErrorMessage(errorMessage);
        throw new Error(errorMessage);
      }
      onSubmitFormTask(formData);
      onToggleShowForm();
    } catch {
      console.error(errorMessage);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData(prev => ({ ...prev, [name]: value })) // must wrap ...prev, [name]: value in ().
    // note input type 'date' simply does not allow input error.
  }

  return (
    <div>
      <div className='flexh spacebetween'>
        <h2>{buttonText}</h2>
        <button onClick={() => onToggleShowForm()}>X</button>
      </div>
      <div className='formcontainer'>
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubmitForm(event)}>
          <label htmlFor='title'>Title:</label>
          <input type="text" id='title' name='title' value={formData.title} onChange={(event) => handleChange(event)} />
          <br />
          <label htmlFor='description'>Description:</label>
          <input type="text" id='description' name='description' value={formData.description} onChange={handleChange} />
          <br />
          <label htmlFor='status'>Status:</label>
          <input type="text" id='status' name='status' value={formData.status} onChange={handleChange} />
          <br />
          <label htmlFor='priority'>Priority:</label>
          <input type="text" id='priority' name='priority' value={formData.priority} onChange={handleChange} />
          <br />
          <label htmlFor='dueDate'>Due Date:</label>
          <input type="date" id='date' name='dueDate' value={formData.dueDate} onChange={handleChange} />
          <br />
          <button type="submit">{buttonText}</button>
        </form>
      </div>
      <div className='errormessage'>
        {formErrorMessage}
      </div>
    </div>
  )
}