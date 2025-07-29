import type { DropdownProps } from '../../types/index.ts';

export const Dropdown = ({ taskId, tasklistSummary, name, onDropdownChange }: DropdownProps) => {
  return (
    <select>
      {((tasklistSummary as any)[name]).map((dropdownItem: string) => <option key={`${taskId}-${name}`} value={dropdownItem}>{dropdownItem}</option> )}
    </select>
  )
}

// export interface DropdownProps {
//   taskId: number;
//   name: keyof Task;
//   onDropdownChange: (taskId: number, keyValue: keyof Task, newValue: string) => void
// }