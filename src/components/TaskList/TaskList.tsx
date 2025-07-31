import type { TaskListProps } from '../../types/index.ts';

import { TaskItem } from './TaskItem';
import { TaskFilter } from '../TaskFilter/TaskFilter';

export const TaskList = ({ tasks, tasklistSummary, onDropdownChange, onDeleteTask, onEditTask, onSortSelect }: TaskListProps) => {
  return (
    <div className = 'taskcontainer'>
      <div className='flexh spacebetween alignitemscenter'>
      <h2>Tasks:</h2>
      <TaskFilter tasks={tasks} onSortSelect={onSortSelect} />
      </div>
      {tasks.map(task => <TaskItem key={`taskitem-${task.taskId}`} task={task} tasklistSummary={tasklistSummary} onDropdownChange={onDropdownChange} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />)}
    </div>
  )
}

