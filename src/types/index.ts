export interface DashboardProps {
  tasklistSummary: DataSummaryType;
  tasks: Task[];
  onSortSelect: (sortSelected: keyof Task) => void;
  onAddFormTask: (newTask: Task) => void;
}

export type DataSummaryType = [
  {
    status: string[],
    priority: string[],
  },
  number
]

export interface DropdownProps {
  task: Task;
  tasklistSummary: DataSummaryType;
  name: keyof Task;
  onDropdownChange: (taskId: number, keyValue: string, newValue: string) => void;
}

export type Filter = {
  filterId: number;
  name: keyof Task,
  value: string,
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

export type TaskKeys = ['taskId', 'title', 'description', 'status', 'priority', 'dueDate'];

export interface TaskFilterProps {
  tasks: Task[];
  onSortSelect: (sortSelected: keyof Task) => void;
}

export interface TaskFormProps {
  tasklistSummary: DataSummaryType;
  task: Task;
  newTask: boolean;
  onToggleShowForm: () => void;
  onSubmitFormTask: (newTask: Task) => void;
}
export interface TaskFormContainerProps {
  tasklistSummary: DataSummaryType;
  taskOrNull: Task | null;
  onSubmitFormTask: (newTask: Task) => void;
}
export interface TaskItemProps {
  task: Task;
  tasklistSummary: DataSummaryType;
  onDropdownChange: (taskId: number, name: string, newValue: string) => void;
  onDeleteTask: (taskId: number) => void;
  onEditTask: (task: Task) => void;
}
export interface TaskListProps {
  tasks: Task[];
  tasklistSummary: DataSummaryType;
  onDropdownChange: (taskId: number, name: string, newValue: string) => void;
  onDeleteTask: (taskId: number) => void;
  onEditTask: (task: Task) => void;
}