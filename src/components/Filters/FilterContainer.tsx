import type { FilterContainerProps } from '../../types';
import { snakeCaseToRegularCase } from '../../utils/taskUtils';

// export interface FilterContainerProps {
//   tasks: Task[];
//   filters: Filter[];
//   onAddFilter: (filter: Filter) => void;
//   onRemoveFilter: (filterId: number) => void;
// }

export const FilterContainer = ({ tasks, filters, onAddFilter, onRemoveFilter }) => {

  return (
    <div>
      <div>Add Filter By:
        <select>
          {tasks.length > 0 ? Object.keys(tasks[0]).map(keyOfTask => <option key={`filter-${keyOfTask}`}>{snakeCaseToRegularCase(keyOfTask)}</option>) : null}
        </select>
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