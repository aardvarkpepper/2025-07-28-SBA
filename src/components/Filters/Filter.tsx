import type { FilterProps } from "../../types";
import { camelCaseToRegularCase, regularCaseToCamelCase } from '../../utils/taskUtils';

export const Filter = ({ filter, onRemoveFilter }: FilterProps) => {

  const handleRemoveFilter = (event: any) => {
    const filterId = Number(event.target.parentElement.dataset.filter);
    onRemoveFilter(filterId);
  }
  return (
    <div data-filter={String(filter.filterId)} className='filtercomponent flexh'>
      <div>{camelCaseToRegularCase(filter.name)}: {filter.value}</div>
      <button onClick={(event) => handleRemoveFilter(event)}>X</button>
    </div>
  )
}