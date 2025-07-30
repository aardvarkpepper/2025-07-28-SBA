import { tasklistData, filterlistData } from '../data/tasklistData.ts';
import type { DataSummaryType, Filter, Task } from '../types/index';

export const dataSummary = (arrayOfObjects: Task[]) => {
  const statusArray = ["Pending", "In Progress", "Completed"];
  const priorityArray = ["Low", "Medium", "High"];
  const returnArray: DataSummaryType = [
    {
      status: statusArray,
      priority: priorityArray,
    },
    0 // arrayOfObjects taskId max.
  ]
  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i].taskId > (returnArray[1])) { // should never be equal
      returnArray[1] = arrayOfObjects[i].taskId; // new IDs are assigned from returnArray[1] + 1
    }
    if (!statusArray.includes(arrayOfObjects[i].status)) {
      statusArray.push(arrayOfObjects[i].status);
    }
    if (!priorityArray.includes(arrayOfObjects[i].priority)) {
      priorityArray.push(arrayOfObjects[i].priority);
    }
  }
  return returnArray;
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

export const getIndexFilter = (unsortedArrayOfObjects: Filter[], filterId: number) => {
  for (let i = 0; i < unsortedArrayOfObjects.length; i++) {
    if (unsortedArrayOfObjects[i].filterId === filterId) {
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

export const sortByKeyValue = (arrayOfObjects: Task[], key: keyof Task) => {
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

export const capitalizeFirstLetters = (stringInput: string) => {
  return stringInput.split(" ").map(element => element[0].toUpperCase() + element.slice(1)).join(" ");
}

// console.log(capitalizeFirstLetters("three"));
// console.log(capitalizeFirstLetters("3"));
// console.log(capitalizeFirstLetters("hamsters like pie"));