import type { TaskListProps } from '../../types/index.ts';

import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks, tasklistSummary, onDropdownChange, onDeleteTask, onEditTask }: TaskListProps) => {
  return (
    <>
      {tasks.map(task => <TaskItem key={`taskitem-${task.taskId}`} task={task} tasklistSummary={tasklistSummary}onDropdownChange={onDropdownChange} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />)}
    </>
  )
}

