import type { TaskListProps } from '../../types/index.ts';

import { TaskItem } from './TaskItem';

// tasks: Task[];
// onDropdownChange: (taskId: string, keyValue: keyof Task, newValue: string) => void;
// onDelete: (taskId: number) => void;

export const TaskList = ({ tasks, tasklistSummary, onDropdownChange, onDeleteTask, onEditTask }: TaskListProps) => {
  return (
    <>
      {tasks.map(task => <TaskItem key={task.taskId} task={task} tasklistSummary={tasklistSummary}onDropdownChange={onDropdownChange} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />)}
    </>
  )
}

