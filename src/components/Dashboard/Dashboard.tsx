  import { useState } from 'react';
  import type { DashboardProps, Task } from '../../types/index';
  import { capitalizeFirstLetters } from '../../utils/taskUtils';
  import { TaskFilter } from '../TaskFilter/TaskFilter';
  import { TaskFormContainer } from '../TaskForm/TaskFormContainer';
  import { StatsContainer } from './StatsContainer';
  
  //  * Navbar:  Add task button, sort by property pulldown
  //  * Add filters by pulldown, changes state of applied filters.  On selection, either a textbox appears, or a pulldown.
  //  * (Search function iterates through array, looking to see if search term is "includes" in title or description).  Can do "split" to separate into array, and search for multiple strings.  Alternately can accept quotation marks for exact match including space e.g. 'bell bottom' will not find bell or bottom, but only 'bell bottom'
  //  *  When form submit is pressed, form disappears, message appears "Form submitted successfully" or some such.
  // Note:  Styling counts for nothing.

export const Dashboard = ({tasklistSummary, tasks, onSortSelect, onAddFormTask, onAddFilter, onRemoveFilter}: DashboardProps) => {

  return (
    <div>
      <div className='statscontainer'>
        <StatsContainer tasks={tasks} />
      </div>
      <div>
        <TaskFormContainer tasklistSummary={tasklistSummary} taskOrNull={null} onSubmitFormTask={onAddFormTask} />
        <TaskFilter tasks={tasks} onSortSelect={onSortSelect}/>
      </div>
      <div>Add Filter By:
        <select>None</select>
        <div>
          <select></select>
          <input type='text'></input>
        </div>
      </div>
      <div>
        <div>Applied Filters:  None</div>
      </div>
    </div>
  )
}