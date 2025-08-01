import type { Task, Filter } from '../types/index';
//note:  Generated data must not have multiple spaces in a row, as HTML trims those and causes equality issues.
export const tasklistData: Task[] = [
  {
    taskId: 10,
    title: 'Add emoji selector to tasklist',
    description: 'Add an emoji selector to the tasklist because hunting up unicode inputs is a bother. 🙄😹',
    status: 'Pending',
    priority: 'Low',
    dueDate: '2025-07-01',
  },
  {
    taskId: 8,
    title: 'Prep for chicken soup',
    description: 'Chop carrots, onions, and celery. Restock garlic, thyme, parsley, bay leaf if necessary.',
    status: 'Pending',
    priority: 'High',
    dueDate: '2025-07-01',
  },
  {
    taskId: 6,
    title: 'Complete three exercises on Leetcode',
    description: 'Keep coding skills fresh by practicing on Leetcode, with its testing of O(n) time and space complexities.',
    status: 'Recurring',
    priority: 'Low',
    dueDate: '2025-07-01',
  },
  {
    taskId: 5,
    title: 'Perform ten air juggle combos in Street Fighter 6',
    description: 'Practice Street Fighter 6 air juggle combos daily to prepare for local tournament.',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-12-30',
  },
  {
    taskId: 4,
    title: 'Look for new job sites to apply for a programming job.',
    description: 'Some jobs aren\'t advertised on traditional job sites so keep looking for new networks.',
    status: 'In Progress',
    priority: 'Custom Priority',
    dueDate: '2026-12-29',
  },
  {
    taskId: 3,
    title: 'Apply to programming jobs',
    description: 'Apply, apply, then apply some more. Can\'t get hired if not applying.',
    status: 'Pending',
    priority: 'High',
    dueDate: '2025-02-12',
  },
  {
    taskId: 2,
    title: 'Build networks',
    description: 'Alternate between looking at professional networks and networks related to personal interests. Personal connections may be less likely to result in jobs, but far more likely to result in jobs I\'m interested in.',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2025-01-14',
  },
  {
    taskId: 1,
    title: 'Clean',
    description: 'For whatever reason, people rarely put \'Dirty\' on their tasklist. Unless they\'re doing something like weathering props for a movie, I suppose. 🤔',
    status: 'Completed',
    priority: 'High',
    dueDate: '2027-01-14',
  },
]

export const filterlistData: Filter[] = [
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
]

