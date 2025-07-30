import { tasklistData, tasklistDataWithErrors, filterlistData } from '../data/tasklistData.ts';
import type { DataSummaryType, Filter, Task, TaskKeys } from '../types/index';

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

export const getErrorArrayForStoredTasklist = (tasklist: Task[]) => {
  const errorArray: string[] = [];
  const arrayOfTaskKeys: TaskKeys = ['taskId', 'title', 'description', 'status', 'priority', 'dueDate'];
  const setOfTaskKeys: Set<any> = new Set(arrayOfTaskKeys);
  const mapOfValuesAndIndices: Map<any, any> = new Map(); // value, array of indices.
  // Typescript types cannot be dynamically updated as types are defined at compile time, which does not intersect with runtime.  Some method of hard-coding is required.
  for (let i = 0; i < tasklist.length; i++) {
    const objKeys = Object.keys(tasklist[i]);
    for (const eachKey of objKeys) {
      if (eachKey === 'taskId' && !mapOfValuesAndIndices.has(tasklist[i][eachKey])) {
        mapOfValuesAndIndices.set(tasklist[i][eachKey], [i])
      } else if (eachKey === 'taskId' && mapOfValuesAndIndices.has(tasklist[i][eachKey])) {
        mapOfValuesAndIndices.set(tasklist[i][eachKey], [...mapOfValuesAndIndices.get(tasklist[i][eachKey]), i])
      }
      if (!setOfTaskKeys.has(eachKey)) {
        errorArray.push(`Data object at index ${i} has key ${eachKey}, but key must be 'taskId', 'title', 'description', 'status', 'priority', or 'dueDate'.`);
      } else if (eachKey === 'taskId' && (typeof tasklist[i][eachKey] !== 'number')) {
        errorArray.push(`Data object at index ${i} with key 'taskId' has value of type ${typeof tasklist[i][eachKey]} but must be value of type number.`);
      }
      if (eachKey !== 'taskId' && typeof (tasklist[i] as any)[eachKey] !== 'string') {
        errorArray.push(`Data object at index ${i} with key '${eachKey}' has value of type ${typeof (tasklist[i] as any)[eachKey]} but must be value of type string.`);
      }
      if ((tasklist[i] as any)[eachKey] === "") {
        errorArray.push(`Data object at index ${i} with key '${eachKey}' has value of empty string, but empty strings are not allowed.`);
      }
    } // for eachKey of objKeys
    if (objKeys.length !== 6) {
      errorArray.push(`Data object has ${objKeys.length} key(s) (${objKeys}) but each data object must have 6 keys; 'taskId', 'title', 'description', 'status', 'priority', and 'dueDate`);
    }
  }
  mapOfValuesAndIndices.forEach((value, key, map) => {
    console.log('MOVAIP TESTING');
    if (value.length > 1) {
      errorArray.push(`taskId values must be unique.  taskId value '${key}' is used at indices ${value.join(" and ")}.`)
    }
  })
  return errorArray;
}

// check date; change from 'pending' to 'overdue'?  But do we want an overdue status?
// pending, complete, in progress
// low, medium, high

// validation - current date, at least?  and check if empty strings?  ok.

