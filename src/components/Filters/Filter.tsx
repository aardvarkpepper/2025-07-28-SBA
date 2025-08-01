import type { FilterProps } from "../../types";
import { camelCaseToRegularCase } from '../../utils/taskUtils';

export const Filter: React.FunctionComponent<FilterProps> = ({ filter, onRemoveFilter }: FilterProps): React.ReactNode => {

  const handleRemoveFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.parentElement) {
      //const filterId: number = Number(event.target.parentElement.dataset.filter); // Property 'parentElement' does not exist on type 'EventTarget'.ts(2339)
      const filterId: number = Number(event.currentTarget.parentElement.dataset.filter) // 'event.currentTarget.parentElement' is possibly 'null'.ts(18047). Placing this block of code in an 'if' statement works as a type guard, ensuring it can't be null so Typescript doesn't make an error.  Anyways it doesn't hurt; if there's no parent element then nothing was being clicked - that's how the component works.
      onRemoveFilter(filterId);
    }
  }
  return (
    <div data-filter={String(filter.filterId)} className='filtercomponent flexh'>
      <div>{camelCaseToRegularCase(filter.name)}: {filter.value}</div>
      <button onClick={(event) => handleRemoveFilter(event)}>X</button>
    </div>
  )
}