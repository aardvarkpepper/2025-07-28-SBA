import type { DropdownProps } from '../../types/index.ts';

export const Dropdown : React.FunctionComponent<DropdownProps> = ({ task, tasklistSummary, name, onDropdownChange }: DropdownProps): React.ReactNode => {
  return (
    <select value={task[name]} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onDropdownChange(task.taskId, name, event.target.value)}>
      {((tasklistSummary as any)[0][name]).map((dropdownItem: string) => <option key={`${dropdownItem}`} value={dropdownItem}>{dropdownItem}</option> )}
    </select>
  )
}