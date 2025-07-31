import type { Task } from '../types/index';

/**
 * Note:  This file contains DELIBERATE errors for revealing error generation / catching.
 */
export const tasklistDataWithErrors: Task[] = [
  {
    taskId: 2,
    title: 'ji',
    description: 'hamster',
    status: 'Pending',
    priority: 'High',
    dueDate: '2025-07-01',
  },
  {
    taskId: 8,
    title: '',
    status: 'Pending',
    priority: 'High',
    dueDate: '2025-07-01',
  },
  {
    taskId: 8,
    title: 'Charlie',
    description: { key: 'value' },
    status: 'Pending',
    priority: 'High',
    dueDate: '2025-07-01',
    hamster: 45,
  },
]