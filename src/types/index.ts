export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}
export interface DropdownProps {
  taskId: number;
  tasklistSummary: {id: number, priority: string[], status: string[]}
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
  tasklistSummary: {id: number, priority: string[], status: string[]}
  onDropdownChange: (taskId: number, name: string, newValue: string) => void;
  onDelete: (taskId: number) => void;
}
export interface TaskListProps {
  tasks: Task[];
  tasklistSummary: {id: number, priority: string[], status: string[]}
  onDropdownChange: (taskId: number, name: string, newValue: string) => void;
  onDelete: (taskId: number) => void;
}