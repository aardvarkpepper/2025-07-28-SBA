import { tasklistData } from '../data/tasklistData.ts';
import type { Task } from '../types/index';

export const dataSummary = (arrayOfObjects: Task[]) => {
  const statusArray = ["Pending", "In Progress", "Completed"];
  const priorityArray = ["Low", "Medium", "High"];
  const returnObj = {
    id: 0,
    status: statusArray,
    priority: priorityArray,
  }
  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i].taskId >= returnObj.id) {
      returnObj.id = arrayOfObjects[i].taskId + 1; // new IDs are assigned from returnObj.id;
    }
    if (!statusArray.includes(arrayOfObjects[i].status)) {
      statusArray.push(arrayOfObjects[i].status);
    }
    if (!priorityArray.includes(arrayOfObjects[i].priority)) {
      priorityArray.push(arrayOfObjects[i].priority);
    }
  }
  return returnObj;
}

//console.log(dataSummary(tasklistData));

export const getIndex = (unsortedArrayOfObjects: Task[], taskId: number) => {
  for (let i = 0; i < unsortedArrayOfObjects.length; i++) {
    if (unsortedArrayOfObjects[i].taskId === taskId) {
      return i;
    }
  }
  return -1;
}

export const getIndexSortedArray = (sortedArrayOfObjects: Task[], taskId: number) => {
  let first = 0, last = sortedArrayOfObjects.length - 1;
  let mid;
  while (first <= last) {
    mid = Math.floor((first + last) / 2);
    //console.log(sortedArrayOfObjects);
    if (sortedArrayOfObjects[mid].taskId === taskId) {
      return mid;
    }
    if (sortedArrayOfObjects[mid].taskId < taskId) {
      first = mid + 1;
    } else {
      last = mid - 1;
    }
  }
  return -1;
}

// console.log(getIndexSortedArray(tasklistData, 1)); // 0
// console.log(getIndexSortedArray(tasklistData, 2)); // 1
// console.log(getIndexSortedArray(tasklistData, 3)); // 2
// console.log(getIndexSortedArray(tasklistData, 17)); // -1

export const sortByKeyValue = (arrayOfObjects: Task[], key: string = 'id') => {
  const deepCopy = [...arrayOfObjects]
  return deepCopy.sort((a, b) => {
    const stringA = (a as any)[key];
    const stringB = (b as any)[key];
    if (stringA < stringB) {
      return -1;
    } else if (stringA > stringB) {
      return 1;
    } else {
      return 0;
    }
  });
}

// console.log(sortByKeyValue(tasklistData, 'dueDate'));
// console.log('=========');
// console.log(sortByKeyValue(tasklistData, 'priority'));