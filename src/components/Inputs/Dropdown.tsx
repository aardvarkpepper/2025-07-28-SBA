import type { DropdownProps } from '../../types/index.ts';

export const Dropdown = ({ task, tasklistSummary, name, onDropdownChange }: DropdownProps) => {
  return (
    <select value={task[name]} onChange={(event) => onDropdownChange(task.taskId, name, event.target.value)}>
      {((tasklistSummary as any)[0][name]).map((dropdownItem: string) => <option key={`${dropdownItem}`} value={dropdownItem}>{dropdownItem}</option> )}
    </select>
  )
}