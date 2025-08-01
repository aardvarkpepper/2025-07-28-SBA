//for later testing use.  Tests reside in tests.ts which ought not to have been pushed to Github.
//import { filterlistData, tasklistData } from '../data/tasklistData.ts';
import type { DataSummaryType, Filter, Task, TaskKeys } from '../types/index';

export const dataSummary = (arrayOfObjects: Task[]): DataSummaryType => {
  const statusArray: string[] = ["Pending", "In Progress", "Completed"];
  const priorityArray: string[] = ["Low", "Medium", "High"];
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

export const getIndex = (unsortedArrayOfObjects: Task[], taskId: number): number => {
  for (let i = 0; i < unsortedArrayOfObjects.length; i++) {
    if (unsortedArrayOfObjects[i].taskId === taskId) {
      return i;
    }
  }
  return -1;
}

export const getIndexFilter = (unsortedArrayOfObjects: Filter[], filterId: number): number => {
  for (let i = 0; i < unsortedArrayOfObjects.length; i++) {
    if (unsortedArrayOfObjects[i].filterId === filterId) {
      return i;
    }
  }
  return -1;
}

export const getIndexSortedArray = (sortedArrayOfObjects: Task[], taskId: number): number => {
  let first: number = 0, last: number = sortedArrayOfObjects.length - 1;
  let mid: number;
  while (first <= last) {
    mid = Math.floor((first + last) / 2);
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

//quick sort, merge sort, or handy method sort?  Data structures and algorithms, you say?  Never heard of them.  But yeah this assignment used a lot of time what with the Typescript and the custom functions and dynamic data and all.
export const sortByKeyValue = (arrayOfObjects: Task[], key: keyof Task): Task[] => {
  const deepCopy = [...arrayOfObjects]
  return deepCopy.sort((a: Task, b: Task) => {
    const valueA: string | number = a[key];
    const valueB: string | number = b[key];
    if (valueA < valueB) { // Javascript can compare strings for greater than / less than.  Heh heh.
      return -1;
    } else if (valueA > valueB) {
      return 1;
    } else {
      return 0;
    }
  });
}

export const capitalizeFirstLetters = (stringInput: string): string => {
  return stringInput.split(" ").map(element => element[0].toUpperCase() + element.slice(1)).join(" ");
}

export const getErrorArrayForStoredTasklist = (tasklist: Task[]): string[] => {
  const errorArray: string[] = [];
  const arrayOfTaskKeys: TaskKeys = ['taskId', 'title', 'description', 'status', 'priority', 'dueDate'];
  const setOfTaskKeys: Set<keyof Task> = new Set(arrayOfTaskKeys); // string instead of keyof Task
  const mapOfValuesAndIndices: Map<(number | string), (number[])> = new Map();
  // Typescript types cannot be dynamically updated as types are defined at compile time, which does not intersect with runtime.  Some method of hard-coding is required.
  for (let i = 0; i < tasklist.length; i++) {
    const objKeys = Object.keys(tasklist[i]) as (keyof Task)[]; // it's an array of the keys in task.
    for (const eachKey of objKeys) { // for each key, in the array of the keys in task
      if (eachKey === 'taskId' && !mapOfValuesAndIndices.has(tasklist[i][eachKey])) {
        mapOfValuesAndIndices.set(tasklist[i][eachKey], [i])
      } else if (eachKey === 'taskId' && mapOfValuesAndIndices.has(tasklist[i][eachKey])) {
        /**
         * When using mapOfValuesAndIndices: Map<(number | string), (number[])> (and variations), the following is highlighted in red.
         * mapOfValuesAndIndices.get(tasklist[i][eachKey]),
         * error: Type 'number[] | undefined' must have a '[Symbol.iterator]()' method that returns an iterator.ts(2488)
         * Typescript infers undefined, then it wants me to pack on a Symbol.
         * So let's see now.  Maybe Map is related to Symbol, but I'm really just using a spread operator to replicate elements in an array.
         * mapOfValuesAndIndices.get(tasklist[i][eachKey]).concat([i])gets
         * Object is possibly 'undefined'.ts(2532)
         * But we know above in the else if, we test the .has.  Wrapping in an if using .get and .has both do not fix the issue.
         * So I pop an 'any' on.  The end result:  Instead of using Map<any, any>, I specified types for Map, but Typescript infers an 'undefined' so I still end up using an 'any'.
         * */
        mapOfValuesAndIndices.set(tasklist[i][eachKey], (mapOfValuesAndIndices as any).get(tasklist[i][eachKey]).concat([i]))
        // mapOfValuesAndIndices.set(tasklist[i][eachKey], [...mapOfValuesAndIndices.get(tasklist[i][eachKey]), i])
      }
      if (!setOfTaskKeys.has(eachKey)) {
        errorArray.push(`Data object at index ${i} has key ${eachKey}, but key must be 'taskId', 'title', 'description', 'status', 'priority', or 'dueDate'.`);
      } else if (eachKey === 'taskId' && (typeof tasklist[i][eachKey] !== 'number')) {
        errorArray.push(`Data object at index ${i} with key 'taskId' has value of type ${typeof tasklist[i][eachKey]} but must be value of type number.`);
      }
      if (eachKey !== 'taskId' && typeof tasklist[i][eachKey] !== 'string') {
        errorArray.push(`Data object at index ${i} with key '${eachKey}' has value of type ${typeof tasklist[i][eachKey]} but must be value of type string.`);
      }
      if (tasklist[i][eachKey] === "") {
        errorArray.push(`Data object at index ${i} with key '${eachKey}' has value of empty string, but empty strings are not allowed.`);
      }
    } // for eachKey of objKeys
    if (objKeys.length !== 6) {
      errorArray.push(`Data object has ${objKeys.length} key(s) (${objKeys}) but each data object must have 6 keys; 'taskId', 'title', 'description', 'status', 'priority', and 'dueDate`);
    }
  }
  //formerly used (value, key, map).  Probably alternate implementation.
  mapOfValuesAndIndices.forEach((value, key) => {
    if (value.length > 1) {
      errorArray.push(`taskId values must be unique.  taskId value '${key}' is used at indices ${value.join(" and ")}.`)
    }
  })
  return errorArray;
}

/**
 * Typescript works with types, the use to control types of inputs.  However, in some cases, as with this function, tight control of input types is not desired.  This utility function is not only supposed to work with Task and Filter but also any potential future data structure.  So it must use object and string.
 * 
 * Apparently objects are not allowed to use indices of type 'string' for safety reasons in Typescript, so each[key] is not allowed.  Were arrayOfObjects given type Task[], then each [keyof Task] would work.  But we will not use Task, or Task | Filter, which introduces new issues down the line.  Simply, it is easiest, given desired functionality, to use 'each as any'.  Similarly, returnObject is used as any (because objects in Typescript have no legal index types as far as I've been able to find.)
 */

export const aggregateTypesAndCounts = (arrayOfObjects: object[], key: string): object => {
  const returnObject: object = {};
  for (const each of arrayOfObjects) {
    const value = (each as any)[key];
    if (value) { // this will not be an empty string or empty spaces due to validation.
      if (!(returnObject as any)[value]) {
        (returnObject as any)[value] = 1;
      } else {
        (returnObject as any)[value]++;
      }
    }
  }
  return returnObject;
}

export const camelCaseToRegularCase = (stringInput: string): string => {
  if (!stringInput.length) {
    return "";
  }
  const regularCaseWords: string[] = [];
  let newWordJoinThis: string[] = [stringInput[0].toUpperCase()];
  for (let i = 1; i < stringInput.length; i++) {
    if (stringInput[i] === stringInput[i].toUpperCase()) {
      const newWord = newWordJoinThis.join("");
      regularCaseWords.push(newWord);
      newWordJoinThis = [stringInput[i]];
    } else {
      newWordJoinThis.push(stringInput[i]);
    }
  }
  const lastWord: string = newWordJoinThis.join("");
  regularCaseWords.push(lastWord);
  return regularCaseWords.join(" ");
}

export const regularCaseToCamelCase = (stringInput: string): string => {
  if (!stringInput.length) {
    return "";
  }
  const snakeCaseWords: string[] = [];
  let newWordJoinThis: string[] = [stringInput[0].toLowerCase()];
  for (let i = 1; i < stringInput.length; i++) {
    if (stringInput[i] === " ") continue;
    if (stringInput[i] === stringInput[i].toUpperCase()) {
      const newWord: string = newWordJoinThis.join("");
      snakeCaseWords.push(newWord);
      newWordJoinThis = [stringInput[i]];
    } else {
      newWordJoinThis.push(stringInput[i]);
    }
  }
  const lastWord: string = newWordJoinThis.join("");
  snakeCaseWords.push(lastWord);
  return snakeCaseWords.join("");
}

export const applyFilters = (filters: Filter[], tasks: Task[]) => {
  const returnArray: Task[] = [];
  for (const task of tasks) {
    let pushMe = true;
    for (const filter of filters) {
      /**
       * So, a fun story.  Filter has name: keyof Task.  But using task[regularCaseToCamelCase](filter.name) gives
       * error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Task'.
       * Well fair enough, because regularCaseToCamelCase returns a string.  But then, why am I using regularCaseToCamelCase anyways?  Probably because somewhere, I stuck a capital letter in at the beginning, probably when populating a dropdown.  So probably I used regularCaseToCamelCase because I needed to, to make things work, but it should never have been necessary in the first place because Typescript ought not to have allowed it.  Or maybe I bypassed Typescript's typing system somehow.  Eh.
       * */
      if ((task as any)[regularCaseToCamelCase(filter.name)] != filter.value) {
        pushMe = false;
        break;
      }
    }
    if (pushMe) {
      returnArray.push(task);
    }
  }
  return returnArray;
}