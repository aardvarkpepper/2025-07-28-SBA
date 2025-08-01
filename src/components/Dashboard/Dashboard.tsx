import type { DashboardProps } from '../../types/index';
import { TaskFormContainer } from '../TaskForm/TaskFormContainer';
import { StatsContainer } from './StatsContainer';
import { FilterContainer } from '../Filters/FilterContainer';

export const Dashboard: React.FunctionComponent<DashboardProps> = ({ tasklistSummary, tasks, onAddFormTask, onAddFilter, onRemoveFilter, filters }: DashboardProps): React.ReactNode => {

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