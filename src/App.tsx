import { useState } from 'react'
import './App.css'
import type { Task, Filter } from './types/index.ts';
import { tasklistData } from './data/tasklistData.ts';
import { dataSummary, getIndex, getIndexFilter, sortByKeyValue } from './utils/taskUtils.ts';
import { TaskList } from './components/TaskList/TaskList';
import { Dashboard } from './components/Dashboard/Dashboard';

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
   * When I set state of tasklist, look through status and priority and assign unique values to the object
   * {status: Set, priority: Set} (just pop them in there), then use that object to populate dropdown. 
   * 
   * OPTIONALS
   * Probably add something like a Set for keywords.  As many keywords (categories) as you like, then can filter on them.
   * What about exclusive / inclusive filtering?  Ah . . . ugh.
   * Just keep it simple.
   * 
   * id: number;
     title: string;
     description: string;
     status: TaskStatus;
     priority: PriorityStatus;
     dueDate: string;


   */

  const [tasklist, setTasklist] = useState(tasklistData);
  const [filterlist, setFilterlist] = useState<Filter[]>([]);

  const tasklistSummary = dataSummary(tasklistData); // contains data on status categories, priority categories, and last assigned index.
  let filterLastIndex = filterlist.reduce((accumulator, currentValue) => (currentValue.filterId > accumulator) ? currentValue.filterId : accumulator, 0);
  console.log(`App tasklistSummary ${JSON.stringify(tasklistSummary)}, filterLastIndex ${filterLastIndex}`)

  const handleDropdownChange = (taskId: number, keyValue: string, newValue: string) => {
    setTasklist(prev => {
      const deepCopy = [];
      for (const each of prev) {
        if (each.taskId !== taskId) {
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

  const handleDeleteTask = (taskId: number) => {
    const indexToDelete = getIndex(tasklist, taskId);
    setTasklist((prev) => (prev.slice(0, indexToDelete).concat(prev.slice(indexToDelete + 1))));
  }

  const handleAddFilter = (filter: Filter) => {
    setFilterlist(prev => [...prev, filter]);
  }

  const handleRemoveFilter = (filterId: number) => {
    const indexToDelete = getIndexFilter(filterlist, filterId);
    setFilterlist(prev => (prev.slice(0, indexToDelete).concat(prev.slice(indexToDelete + 1))));
  }

  const handleAddTask = (task: Task) => {
    setTasklist(prev => [...prev, task]);
  }

  const handleSortTasksByArgument = (key: keyof Task) => {
    setTasklist(prev => sortByKeyValue([...prev], key));
  }

  //   export type Filter = {
  //   name: keyof Task,
  //   value: string
  // }

  // utility function, feed in filters and tasklist, get back filtered tasklist.  Import this.
  // Changes to task property, tasklist, filter all re-render core state, so a call on the utility
  // function should work fine.  Sorting too.

  /**
   * 
   * update task
   * date formatting
   * validation feedback
   * add task statistics - number total, number of each priority, number of each status
   * localstorage
   * drag and drop
   * toggle light and dark
   * pass theme down to components that need it
   * add animations/transitions for state changes
   * 
   * Dashboard:
   * 
   * tasklistSummary, filterLastIndex, handleAddTask, handleAddFilter, handleDeleteFilter, handleSortTasksByArgument
   * 
   * handleEditTask should go to TASKLIST/TASK
   * 
   * Above Taskform is a 
   * TaskForm takes props:  task (or none), 
   * 
   * Button sets local STATE to display form or not
   * 
   * Form requires button to submit.  This requires a handleSubmitForm function in App to be passed down as a prop.  Form takes a task or null . . . but union types are a bother.
   * 
   * Dashboard requires tasklistSummary to populate SortBy dynamically.  Use tasklistSummary[0].forEach was it?
   * 
   * Filter dropdown, if selected title, description, due date, generates label e.g. 'Description:' and input text/date box.
   * If selected priority or status, use tasklistSummary to generate label e.g. 'Priority:' and dropdown.
   *
   * App must have an array of filter objects in STATE.  This looks like [{keyof Task: value: string}].
   * When a filter is added in Dashboard, a list populates in the Dashboard, containing keyof and value information, and a button to remove the filter.  handleRemoveFilter and handleAddFilter.
   * 
   * 
   * export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}
   */

  return (

    <div>
      <Dashboard tasklistSummary={tasklistSummary} tasks={tasklist} onSortSelect={handleSortTasksByArgument} />
      <TaskList tasks={tasklist} tasklistSummary={tasklistSummary} onDropdownChange={handleDropdownChange} onDeleteTask={handleDeleteTask} />
    </div>

  )
}

export default App;
