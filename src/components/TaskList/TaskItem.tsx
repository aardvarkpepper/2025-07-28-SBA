// export interface Task {
//   id: number;
//   title: string;
//   description: string;
//   status: string;
//   priority: string;
//   dueDate: string;
// }

// export interface DropdownProps {
//   onDropdownChange: (taskId: number, keyValue: keyof Task, newValue: string) => void
// }

// export interface TaskListProps {
//   tasks: Task[];
//   onDropdownChange: (taskId: number, name: keyof Task, newValue: string) => void;
//   onDelete: (taskId: number) => void;
// }

import type { TaskItemProps } from '../../types/index.ts';
import { Dropdown } from '../Inputs/Dropdown';

export const TaskItem = ({ task, tasklistSummary, onDropdownChange, onDelete }: TaskItemProps) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <div>{task.description}</div>
      <Dropdown taskId={task.taskId} tasklistSummary={tasklistSummary} name='priority' onDropdownChange={onDropdownChange} />
      <Dropdown taskId={task.taskId} tasklistSummary={tasklistSummary} name='status' onDropdownChange={onDropdownChange} />
      <button onClick={() => onDelete(task.taskId)}>Delete</button>
    </div>
  )
}