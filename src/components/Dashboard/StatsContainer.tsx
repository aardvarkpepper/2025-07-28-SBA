import type { StatsContainerProps } from '../../types/index';
import { aggregateTypesAndCounts } from '../../utils/taskUtils';

export const StatsContainer: React.FunctionComponent<StatsContainerProps> = ({ tasks }: StatsContainerProps): React.ReactNode => {
  const priorityentries: [string, number][] = Object.entries(aggregateTypesAndCounts(tasks, 'priority'));
  const statusentries: [string, number][] = Object.entries(aggregateTypesAndCounts(tasks, 'status'));

  return (
    <div className='statscontainer'>
      <h2>Task Statistics</h2>
      <div>TOTAL TASKS: {tasks.length}</div>
      <div>PRIORITY TYPES
        {priorityentries.map(([value, count]) => <span key={value}>,{value} : {count} </span>)}
      </div>
      <div>STATUS TYPES
        {statusentries.map(([value, count]) => <span key={value}>,{value} : {count} </span>)}
      </div>
    </div>
  )
}