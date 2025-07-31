import type { TaskItemProps } from '../../types/index.ts';
import { Dropdown } from '../Inputs/Dropdown';
import { TaskFormContainer } from '../TaskForm/TaskFormContainer';

export const TaskItem = ({ task, tasklistSummary, onDropdownChange, onDeleteTask, onEditTask }: TaskItemProps) => {
  return (
    <div className='taskitem'>
      <h2>TITLE: {task.title}, ID {task.taskId}</h2>
      <div>DESCRIPTION: {task.description}</div>
      <div>DUE DATE: {task.dueDate}</div>
      <Dropdown task={task} tasklistSummary={tasklistSummary} name='priority' onDropdownChange={onDropdownChange} />
      <Dropdown task={task} tasklistSummary={tasklistSummary} name='status' onDropdownChange={onDropdownChange} />
      <TaskFormContainer tasklistSummary={tasklistSummary} taskOrNull={task} onSubmitFormTask={onEditTask}/>
      <button onClick={() => onDeleteTask(task.taskId)}>Delete</button>
    </div>
  )
}