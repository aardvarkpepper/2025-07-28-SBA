import { useState } from 'react';
import type { DashboardProps, Task } from '../../types/index';
import { capitalizeFirstLetters } from '../../utils/taskUtils';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskFormContainer } from '../TaskForm/TaskFormContainer';
import { StatsContainer } from './StatsContainer';
import { FilterContainer } from '../Filters/FilterContainer';

//  * Navbar:  Add task button, sort by property pulldown
//  * Add filters by pulldown, changes state of applied filters.  On selection, either a textbox appears, or a pulldown.
//  * (Search function iterates through array, looking to see if search term is "includes" in title or description).  Can do "split" to separate into array, and search for multiple strings.  Alternately can accept quotation marks for exact match including space e.g. 'bell bottom' will not find bell or bottom, but only 'bell bottom'
//  *  When form submit is pressed, form disappears, message appears "Form submitted successfully" or some such.
// Note:  Styling counts for nothing.

export const Dashboard = ({ tasklistSummary, tasks, onSortSelect, onAddFormTask, onAddFilter, onRemoveFilter, filters }: DashboardProps) => {


  // import type { Task, TaskFilterProps } from '../../types/index';
  // import { capitalizeFirstLetters } from '../../utils/taskUtils';

  // export const TaskFilter = ({ tasks, onSortSelect }: TaskFilterProps) => {
  //   return (
  //     <select onChange={(event) => onSortSelect(event.target.value as keyof Task)}>
  //       {tasks.length > 0 ? Object.keys(tasks[0])?.map(taskKey => <option key={taskKey} value={taskKey}>{`Sort By: ${capitalizeFirstLetters(taskKey)}`}</option>): null}
  //     </select>
  //   )
  // }
  return (
    <div>
      <div className='statscontainer'>
        <StatsContainer tasks={tasks} />
      </div>
      <div>
        <TaskFormContainer tasklistSummary={tasklistSummary} taskOrNull={null} onSubmitFormTask={onAddFormTask} />
        <TaskFilter tasks={tasks} onSortSelect={onSortSelect} />
      </div>
      <div>
        <FilterContainer tasks={tasks} filters={filters} onAddFilter = {onAddFilter} onRemoveFilter = {onRemoveFilter} />
      </div>
    </div>
  )
}