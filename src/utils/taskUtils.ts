import { tasklistData } from '../data/tasklistData.ts';
import type { Task } from '../types/index';

export const dataSummary = (arrayOfObjects: Task[]) => {
  const statusMap = new Set(["Pending", "In Progress", "Completed"]);
  const priorityMap = new Set(["Low", "Medium", "High"]);
  const returnObj = {
    id: 0,
    status: statusMap,
    priority: priorityMap,
  }
  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i].id >= returnObj.id) {
      returnObj.id = arrayOfObjects[i].id + 1; // new IDs are assigned from returnObj.id;
    }
    if (!statusMap.has(arrayOfObjects[i].status)) {
      statusMap.add(arrayOfObjects[i].status);
    }
    if (!priorityMap.has(arrayOfObjects[i].priority)) {
      priorityMap.add(arrayOfObjects[i].priority);
    }
  }
  return returnObj
}

console.log(dataSummary(tasklistData));