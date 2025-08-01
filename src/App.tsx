import { useState } from 'react'
import './App.css'
import type { DataSummaryType, Task, Filter } from './types/index.ts';
import { tasklistData, filterlistData } from './data/tasklistData.ts';
//for later use
//import { tasklistDataWithErrors } from './data/tasklistDataWithErrors.ts';

import { dataSummary, getIndex, getIndexFilter, sortByKeyValue, applyFilters } from './utils/taskUtils.ts';
import { TaskList } from './components/TaskList/TaskList';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  const [tasklist, setTasklist] = useState<Task[]>(tasklistData);
  const [filterlist, setFilterlist] = useState<Filter[]>(filterlistData);
  const [darkmode, setDarkmode] = useState<string>("Deactivate Darkmode");


  const tasklistSummary: DataSummaryType = dataSummary(tasklist); // contains data on status categories, priority categories, and last assigned index.

  //for later use.  In the meantime, this is run at the lowest level possible.
  //let filterLastIndex = filterlist.reduce((accumulator, currentValue) => (currentValue.filterId > accumulator) ? currentValue.filterId : accumulator, 0);

  const handleDropdownChange = (taskId: number, keyValue: string, newValue: string) => {
    setTasklist(prev => {
      const deepCopy: Task[] = [];
      for (const each of prev) {
        if (each.taskId !== taskId) {
          deepCopy.push(each);
        } else {
          const deepCopy2 = JSON.parse(JSON.stringify(each));
          deepCopy2[keyValue] = newValue;
          deepCopy.push(deepCopy2);
        }
      }
      return deepCopy;
    }); // setTasklist
  }; // handleDropdownChange

  const handleDeleteTask = (taskId: number) => {
    const indexToDelete = getIndex(tasklist, taskId);
    setTasklist((prev) => (prev.slice(0, indexToDelete).concat(prev.slice(indexToDelete + 1))));
  }

  const handleAddFilter = (filter: Filter) => {
    setFilterlist(prev => {
      return [...prev, filter]
    });
  }

  const handleRemoveFilter = (filterId: number) => {
    const indexToDelete = getIndexFilter((filterlist as any), filterId);
    setFilterlist(prev => (prev.slice(0, indexToDelete).concat(prev.slice(indexToDelete + 1))));
  }

  const handleAddTask = (task: Task) => {
    setTasklist(prev => {

      return [task, ...prev]
    }); //setTasklist
  } // handleAddTask

  const handleEditTask = (task: Task) => {
    setTasklist(prev => {
      return prev.map(taskElement => (taskElement.taskId === task.taskId) ? task : taskElement)
    }); //setTasklist
  } // handleEditTask

  const handleSortTasksByArgument = (key: keyof Task) => {
    setTasklist(prev => sortByKeyValue([...prev], key));
  }

  const handleToggleDarkMode = (event: any) => {
    setDarkmode(prev => {
      if (prev === 'Deactivate Darkmode') {
        event.target.parentElement.className = 'app'
      } else {
        event.target.parentElement.className = 'app dark'
      }
      return (prev === 'Deactivate Darkmode' ? 'Activate Darkmode' : 'Deactivate Darkmode');
    });
  }

  return (
    <div className='app dark'>
      <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleToggleDarkMode(event)}>{darkmode}</button>
      <Dashboard tasklistSummary={tasklistSummary} tasks={tasklist} onAddFormTask={handleAddTask} onAddFilter={handleAddFilter} onRemoveFilter={handleRemoveFilter} filters={filterlist as any} />
      <TaskList tasks={applyFilters(filterlist, tasklist)} tasklistSummary={tasklistSummary} onDropdownChange={handleDropdownChange} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} onSortSelect={handleSortTasksByArgument} />
    </div>
  )
}

export default App;
