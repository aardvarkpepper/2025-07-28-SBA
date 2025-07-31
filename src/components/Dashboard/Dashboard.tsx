import { useState } from 'react';
import type { DashboardProps, Task } from '../../types/index';
import { capitalizeFirstLetters } from '../../utils/taskUtils';
import { TaskFilter } from '../TaskFilter/TaskFilter';
import { TaskFormContainer } from '../TaskForm/TaskFormContainer';
import { StatsContainer } from './StatsContainer';
import { FilterContainer } from '../Filters/FilterContainer';

export const Dashboard = ({ tasklistSummary, tasks, onAddFormTask, onAddFilter, onRemoveFilter, filters }: DashboardProps) => {

  return (
    <div>
      <div className='statscontainer'>
        <StatsContainer tasks={tasks} />
      </div>
      <div>
        <FilterContainer tasks={tasks} filters={filters} onAddFilter={onAddFilter} onRemoveFilter={onRemoveFilter} />
      </div>

      <div className='addsortcontainer flexh'>
        <TaskFormContainer tasklistSummary={tasklistSummary} taskOrNull={null} onSubmitFormTask={onAddFormTask} />
      </div>

    </div>
  )
}