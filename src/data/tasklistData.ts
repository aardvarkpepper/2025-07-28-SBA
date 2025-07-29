import type { Task } from '../types/index';
export const tasklistData: Task[] = [
  {
    taskId: 1,
    title: 'Charlie',
    description: 'Juliet',
    status: 'Pending',
    priority: 'High',
    dueDate: '2025-07-01',
  },
  {
    taskId: 2,
    title: 'Bravo Duplicate',
    description: 'Kilo Duplicate',
    status: 'Custom Status',
    priority: 'Low',
    dueDate: '2025-07-01',
  },
  {
    taskId: 3,
    title: 'Alpha',
    description: 'India',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-12-30',
  },
  {
    taskId: 4,
    title: 'Foxtrot',
    description: 'Kilo Duplicate',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-12-29',
  },
  {
    taskId: 5,
    title: 'Bravo Duplicate',
    description: 'Hotel',
    status: 'Pending',
    priority: 'Custom Priority',
    dueDate: '2025-02-12',
  },
  {
    taskId: 6,
    title: 'Echo',
    description: 'Golf',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2025-01-14',
  },
  {
    taskId: 8,
    title: 'Lima',
    description: 'Mike',
    status: 'Pending',
    priority: 'High',
    dueDate: '2027-01-14',
  },
]

export const filterlistData = [
  {
    filterId: 1,
    name: 'status',
    value: 'Pending',
  },
  {
    filterId: 2,
    name: 'priority',
    value: 'High',
  },
  {
    filterId: 6,
    name: 'description',
    value: 'Mik',
  }
]