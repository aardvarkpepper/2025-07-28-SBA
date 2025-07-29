import { useState } from 'react'
import './App.css'

import type { Task } from './types/index.ts';
import { tasklistData } from './data/tasklistData.ts';
import { dataSummary, getIndex } from './utils/taskUtils.ts';

import { TaskList } from './components/TaskList/TaskList';

function App() {

 // const [count, setCount] = useState(0)
  // Remember to wipe comments.
  // 'Add a search bar to search for tasks' - this is essentially what, really?
  // Add task statistics.  validation helpers.  date formatting utilities.

  /**

   * Navbar:  Add task button, sort by property
   * List filters, add filters, search function.
   * (Search function iterates through array, looking to see if search term is "includes" in title or description).  Can do "split" to separate into array, and search for multiple strings.  Alternately can accept quotation marks for exact match including space e.g. 'bell bottom' will not find bell or bottom, but only 'bell bottom'
   *  When form submit is pressed, form disappears, message appears "Form submitted successfully" or some such.
   * 
   * 
   * 
   * Pregen tasks.
   * 
   * Tasklist, Task.  Use the filters as mentioned.

   * 
   * Form with validation.  When I make a new form, assign unique ID, and check dates(limit 10 years)
   * So include an area for output.
   * Error handling
   * user-friendly feedback
   * 
   * When I set state of tasklist, look through status and priority and assign unique values to the object
   * {status: Set, priority: Set} (just pop them in there), then use that object to populate dropdown. 
   * 
   * OPTIONALS
   * Probably add something like a Set for keywords.  As many keywords (categories) as you like, then can filter on them.
   * What about exclusive / inclusive filtering?  Ah . . . ugh.
   * Just keep it simple.
   * 
   * id: string;
     title: string;
     description: string;
     status: TaskStatus;
     priority: PriorityStatus;
     dueDate: string;

     export interface TaskListProps {
       tasks: Task[];
       onStatusChange: (taskId: string, keyValue: keyof Task, newValue: string) => void;
       onPriorityChange: (taskId: string, keyValue: keyof Task, newValue: string) => void;
       // onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
       // onPriorityChange: (taskId: string, newPriority: PriorityStatus) => void;
       onDelete: (taskId: string) => void;
     }
     

   */

  const [tasklist, setTasklist] = useState(tasklistData);
  const tasklistSummary = dataSummary(tasklistData);

  const handleDropdownChange = (taskId: number, keyValue: keyof Task, newValue: string) => {
    setTasklist(prev => {
      const deepCopy = [];
      for (const each of prev) {
        if (each.id !== taskId) {
          deepCopy.push(each);
        } else {
          const deepCopy2 = JSON.parse(JSON.stringify(each));
          deepCopy2[keyValue] = newValue;
          deepCopy.push(deepCopy2);
        }
      }
      return deepCopy;
    }); // setTasklist
  }; // handleDropdownChange

  const handleDelete = (taskId: number) => {
    //console.log('core handleDelete triggered');
    const indexToDelete = getIndex(tasklist, taskId);
    setTasklist(prev => prev.slice(0, indexToDelete).concat(prev.slice(indexToDelete + 1)));
  }

  tasks, tasklistSummary, onDropdownChange, onDelete

  return (

    <div>
      <TaskList tasks={tasklistSummary} tasklistSummary={tasklistSummary} onDropdownChange={handleDropdownChange} onDelete={handleDelete} />
    </div>

  )
}

export default App
