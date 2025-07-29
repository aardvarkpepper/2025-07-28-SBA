export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

export type dataSummaryType = [
  {
    status: string[],
    priority: string[],
  },
  number
]
export interface DropdownProps {
  task: Task;
  tasklistSummary: dataSummaryType
  name: keyof Task;
  onDropdownChange: (taskId: number, keyValue: string, newValue: string) => void
}
// export interface TaskFilterProps {
//   onFilterChange: (filters: {
//     status?: string; // task status
//     priority?: string; // priority status
//   }) => void;
// }
export interface TaskItemProps {
  task: Task;
  tasklistSummary: dataSummaryType
  onDropdownChange: (taskId: number, name: string, newValue: string) => void;
  onDelete: (taskId: number) => void;
}
export interface TaskListProps {
  tasks: Task[];
  tasklistSummary: dataSummaryType
  onDropdownChange: (taskId: number, name: string, newValue: string) => void;
  onDelete: (taskId: number) => void;
}