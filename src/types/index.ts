export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, keyValue: keyof Task, newValue: string) => void;
  onPriorityChange: (taskId: string, keyValue: keyof Task, newValue: string) => void;
  // onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  // onPriorityChange: (taskId: string, newPriority: PriorityStatus) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, keyValue: keyof Task, newValue: string) => void;
  onPriorityChange: (taskId: string, keyValue: keyof Task, newValue: string) => void;
  // onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  // onPriorityChange: (taskId: string, newPriority: PriorityStatus) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: string; // task status
    priority?: string; // priority status
  }) => void;
}