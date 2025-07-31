import type { FilterProps } from "../../types";
import { camelCaseToRegularCase, regularCaseToCamelCase } from '../../utils/taskUtils';



// export type Filter = {
//   filterId: number;
//   name: keyof Task,
//   value: string,
// }

export const Filter = ({ filter, onRemoveFilter }: FilterProps) => {

  const handleRemoveFilter = (event: any) => {
    const filterId = Number(event.target.parentElement.dataset.filter);
    onRemoveFilter(filterId);
  }
  return (
    <div data-filter={String(filter.filterId)} className='filter'>
      <div>{camelCaseToRegularCase(filter.name)}: {filter.value}</div>
      <button onClick={(event) => handleRemoveFilter(event)}>X</button>
    </div>
  )
}