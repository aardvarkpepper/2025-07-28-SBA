import type { Task, TaskFilterProps } from '../../types/index';
import { capitalizeFirstLetters } from '../../utils/taskUtils';

export const TaskFilter = ({ tasks, onSortSelect }: TaskFilterProps) => {
  return (
    <select onChange={(event) => onSortSelect(event.target.value as keyof Task)}>
      {tasks.length > 0 ? Object.keys(tasks[0])?.map(taskKey => <option key={taskKey} value={taskKey}>{`Sort By: ${capitalizeFirstLetters(taskKey)}`}</option>): null}
    </select>
  )
}