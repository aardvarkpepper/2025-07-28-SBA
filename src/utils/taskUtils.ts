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

export const sortByKeyValue = (arrayOfObjects: Task[], key: keyof Task = 'id') => {
  const deepCopy = [...arrayOfObjects]
  return deepCopy.sort((a, b) => {
    const stringA = a[key];
    const stringB = b[key];
    if (stringA < stringB) {
      return -1;
    } else if (stringA > stringB) {
      return 1;
    } else {
      return 0;
    }
  });
}

export const getIndexSortedArray = (sortedArrayOfObjects: Task[], id: number) => {
  let first = 0, last = sortedArrayOfObjects.length - 1;
  let mid;
  while (first <= last) {
    mid = Math.floor((first + last) / 2);
    if (sortedArrayOfObjects[mid].id === id) {
      return mid;
    }
    if (sortedArrayOfObjects[mid].id < id) {
      first = mid + 1;
    } else {
      last = mid - 1;
    }
  }
  return -1;
}

export const getIndex = (unsortedArrayOfObjects: Task[], id: number) => {
  for (let i = 0; i < unsortedArrayOfObjects.length; i++) {
    if (unsortedArrayOfObjects[i].id === id) {
      return i;
    }
  }
  return -1;
}