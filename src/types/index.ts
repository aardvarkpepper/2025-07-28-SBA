export interface DashboardProps {
  tasklistSummary: DataSummaryType;
  tasks: Task[];
  filters: Filter[];
  onAddFormTask: (newTask: Task) => void;
  onAddFilter: (filter: Filter) => void;
  onRemoveFilter: (filterId: number) => void;
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
  value: any
}

export interface FilterProps {
  filter: Filter
  onRemoveFilter: (filterId: number) => void;
}

export interface FilterContainerProps {
  tasks: Task[];
  filters: Filter[];
  onAddFilter: (filter: Filter) => void;
  onRemoveFilter: (filterId: number) => void;
}
export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}
export interface StatsContainerProps {
  tasks: Task[];
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
  onSortSelect: (sortSelected: keyof Task) => void;
}