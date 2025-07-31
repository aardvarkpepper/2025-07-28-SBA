import type { FilterContainerProps } from '../../types';
import { aggregateTypesAndCounts, camelCaseToRegularCase, regularCaseToCamelCase } from '../../utils/taskUtils';
import { useState } from 'react';

// export interface FilterContainerProps {
//   tasks: Task[];
//   filters: Filter[];
//   onAddFilter: (filter: Filter) => void;
//   onRemoveFilter: (filterId: number) => void;
// }

export const FilterContainer = ({ tasks, filters, onAddFilter, onRemoveFilter }) => {
  let defaultFilterValueArray: any[] = [];
  let defaultFilterValue = null;
  if (tasks.length > 0) {
    defaultFilterValueArray = Object.entries(aggregateTypesAndCounts(tasks, 'taskId')).map(element => element[0]);
    // console.log(`Populating with ${defaultFilterValueArray}`);
    defaultFilterValue = defaultFilterValueArray[0];
  }

  const [filterType, setFilterType] = useState('taskId');
  const [filterValueArray, setFilterValueArray] = useState(defaultFilterValueArray);
  const [filterValue, setFilterValue] = useState(defaultFilterValue)

  const handleChangeFilterType = (event: any) => {
    setFilterType(prev => {
      const newArray = Object.entries(aggregateTypesAndCounts(tasks, regularCaseToCamelCase(event.target.value))).map(element => element[0]);
      //console.log(`filterContainer, ${newArray}, ${newArray.length}`);
      console.log(`hCFT, populating value options with ${newArray}`)
      setFilterValueArray(newArray);
      //console.log(`filterContainer2 setting filter type to ${regularCaseToCamelCase(event.target.value)}`);
      return event.target.value;
    });
  }

  const handleChangeFilterValue = (event: any) => {

  }

  return (
    <div>
      <div>Add Filter By:
        <select onChange={(event) => handleChangeFilterType(event)}>
          {tasks.length > 0 ? Object.keys(tasks[0]).map(keyOfTask => <option key={`filterkey-${keyOfTask}`}>{camelCaseToRegularCase(keyOfTask)}</option>) : null}
        </select>
        <select>
          {tasks.length > 0 ? filterValueArray.map(valueOfTask => <option key={`filtervalue-${valueOfTask}`}>{valueOfTask}</option>) : null}
        </select>
        <button>Add Filter</button>
        <div>
          <select></select>
          <input type='text'></input>
        </div>
      </div>
      <div>
        <div>Applied Filters:  None</div>
      </div>
    </div>
  )
}