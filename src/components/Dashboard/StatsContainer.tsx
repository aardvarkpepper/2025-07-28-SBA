import type { StatsContainerProps } from '../../types/index';
import { aggregateTypesAndCounts } from '../../utils/taskUtils';

export const StatsContainer = ({ tasks }: StatsContainerProps) => {
  const priorityentries = Object.entries(aggregateTypesAndCounts(tasks, 'priority'));
  const statusentries = Object.entries(aggregateTypesAndCounts(tasks, 'status'));

  return (
    <div className='statscontainer'>
      <h2>Task Statistics</h2>
      <div>TOTAL TASKS: {tasks.length}</div>
      <div>PRIORITY TYPES
        {priorityentries.map(([value, count]) => <span key={value}>,{value} : {count as any} </span>)}
      </div>
      <div>STATUS TYPES
        {statusentries.map(([value, count]) => <span key={value}>,{value} : {count as any} </span>)}
      </div>
    </div>
  )
}