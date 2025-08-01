import type { FilterContainerProps, Task } from '../../types';
import { aggregateTypesAndCounts, camelCaseToRegularCase, regularCaseToCamelCase } from '../../utils/taskUtils';
import { useState } from 'react';
import { Filter } from './Filter';

export const FilterContainer: React.FunctionComponent<FilterContainerProps> = ({ tasks, filters, onAddFilter, onRemoveFilter }: FilterContainerProps): React.ReactNode => {
  let defaultFilterValueArray: string[] = [];
  let defaultFilterValue: string | null = null;
  let filterLastIndex: number = 0;
  if (tasks.length > 0) {
    defaultFilterValueArray = Object.entries(aggregateTypesAndCounts(tasks, 'taskId')).map(element => element[0]);
    defaultFilterValue = defaultFilterValueArray[0];
  }
  if (filters.length > 0) {
      filterLastIndex = filters.reduce((accumulator, currentValue) => (currentValue.filterId > accumulator) ? currentValue.filterId : accumulator, 0);
  }

  const [filterType, setFilterType] = useState<string>('taskId');
  const [filterValueArray, setFilterValueArray] = useState<string[]>(defaultFilterValueArray);
  const [filterValue, setFilterValue] = useState<string | null>(defaultFilterValue)

  const handleChangeFilterType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Alternate implementation demonstrating use of function call inside setState.
    // setFilterType(prev => { // 
    //   const newArray = Object.entries(aggregateTypesAndCounts(tasks, regularCaseToCamelCase(event.target.value))).map(element => element[0]);
    //   setFilterValueArray(newArray);
    //   return event.target.value;
    // });
    setFilterType(event.target.value);
    const newArray = Object.entries(aggregateTypesAndCounts(tasks, regularCaseToCamelCase(event.target.value))).map(element => element[0]);
    setFilterValueArray(newArray);
  }

  const handleChangeFilterValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChangeFilterType(event)}>
          {tasks.length > 0 ? Object.keys(tasks[0]).map(keyOfTask => <option key={`filterkey-${keyOfTask}`}>{camelCaseToRegularCase(keyOfTask)}</option>) : null}
        </select>
        <select onChange={((event: React.ChangeEvent<HTMLSelectElement>) => handleChangeFilterValue(event))}>
          {tasks.length > 0 ? filterValueArray.map(valueOfTask => <option key={`filtervalue-${valueOfTask}`}>{valueOfTask}</option>) : null}
        </select>
        <button onClick={() => handleAddFilter()}>Add Filter</button>
        <div>
          <h2>Active Filters: {filters.length}</h2>
          <div className='flexh'>
            {filters.map(filter => <Filter key={`filterId${filter.filterId}`} filter={filter} onRemoveFilter={onRemoveFilter}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}