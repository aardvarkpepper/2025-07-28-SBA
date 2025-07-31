import type { FilterContainerProps, Task } from '../../types';
import { aggregateTypesAndCounts, camelCaseToRegularCase, regularCaseToCamelCase } from '../../utils/taskUtils';
import { useState } from 'react';
import { Filter } from './Filter';

export const FilterContainer = ({ tasks, filters, onAddFilter, onRemoveFilter }: FilterContainerProps) => {
  let defaultFilterValueArray: any[] = [];
  let defaultFilterValue = null;
  let filterLastIndex = 0;
  if (tasks.length > 0) {
    defaultFilterValueArray = Object.entries(aggregateTypesAndCounts(tasks, 'taskId')).map(element => element[0]);
    defaultFilterValue = defaultFilterValueArray[0];
  }
  if (filters.length > 0) {
      filterLastIndex = filters.reduce((accumulator, currentValue) => (currentValue.filterId > accumulator) ? currentValue.filterId : accumulator, 0);
  }

  const [filterType, setFilterType] = useState('taskId');
  const [filterValueArray, setFilterValueArray] = useState(defaultFilterValueArray);
  const [filterValue, setFilterValue] = useState(defaultFilterValue)

  const handleChangeFilterType = (event: any) => {
    setFilterType(prev => {
      const newArray = Object.entries(aggregateTypesAndCounts(tasks, regularCaseToCamelCase(event.target.value))).map(element => element[0]);
      setFilterValueArray(newArray);
      return event.target.value;
    });
  }

  const handleChangeFilterValue = (event: any) => {
    setFilterValue(event.target.value);
  }

  const handleAddFilter = () => {
    onAddFilter({
      filterId: filterLastIndex + 1,
      name: (filterType as keyof Task),
      value: filterType === 'taskId' ? Number(filterValue) : filterValue
    })
  }

  return (
    <div className='filtercontainer'>
      <div>Add Filter By:
        <select onChange={(event) => handleChangeFilterType(event)}>
          {tasks.length > 0 ? Object.keys(tasks[0]).map(keyOfTask => <option key={`filterkey-${keyOfTask}`}>{camelCaseToRegularCase(keyOfTask)}</option>) : null}
        </select>
        <select onChange={((event) => handleChangeFilterValue(event))}>
          {tasks.length > 0 ? filterValueArray.map(valueOfTask => <option key={`filtervalue-${valueOfTask}`}>{valueOfTask}</option>) : null}
        </select>
        <button onClick={() => handleAddFilter()}>Add Filter</button>
        <div>
          <h2>Active Filters:</h2>
          <div className='flexh'>
            {filters.map(filter => <Filter key={`filterId${filter.filterId}`} filter={filter} onRemoveFilter={onRemoveFilter}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}