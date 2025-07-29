export type DataSummaryType = [
  {
    status: string[],
    priority: string[],
  },
  number
]
export interface DropdownProps {
  task: Task;
  tasklistSummary: DataSummaryType
  name: keyof Task;
  onDropdownChange: (taskId: number, keyValue: string, newValue: string) => void
}

export type Filter = {
  filterId: number;
  name: keyof Task,
  value: string
}
// export interface TaskFilterProps {
//   onFilterChange: (filters: {
//     status?: string; // task status
//     priority?: string; // priority status
//   }) => void;
// }
export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}
export interface TaskItemProps {
  task: Task;
  tasklistSummary: DataSummaryType
  onDropdownChange: (taskId: number, name: string, newValue: string) => void;
  onDelete: (taskId: number) => void;
}
export interface TaskListProps {
  tasks: Task[];
  tasklistSummary: DataSummaryType
  onDropdownChange: (taskId: number, name: string, newValue: string) => void;
  onDelete: (taskId: number) => void;
}