## Notes

npx tsc to compile typescript after typescript edits, particularly anything involving types.  (Must compile).  Note types defined at compilation also means type aliases cannot dyanmically be defined at runtime, e.g. on user data.

Particularly, test items using keyof if user ever has ability to add things that are affected by keyof.  For this project, I don't think that will apply; users can customize values but can't enter new keys.

onSubmitFormTask uses submit new task in Dashboard/TaskFormContainer/Taskform, but uses edit task in TaskList/Task.

'Add a search bar to search for tasks' - use .split and .includes or such to effectively filter tasks.  Instead, implemented dropdowns populated by dynamic data.

Note:  When adding a new task, the currently selected filter dropdown does not repopulate.  That is, if filter by status is currently shown, and new task is added, the dropdown corresponding to status does not show the new status that was just entered.  But selecting a different filter by priority, say, updates all values.  Hm.  So when setting state on adding a task, then I call something that updates the filter fields as well, is all.  Edit as well.

## Tests

Test what happens when adding a new task with a new "status" type.  Does the status dropdown populate?  What happens when a "status" type is deleted?  Does the status dropdown depopulate?  What about changing a task?  Creation, update, and deletion of items should affect 'tasklist' state so re-render, causing re-calculation of the data component populating those dropdowns.  However, possibly React may not re-render some components (so may not reload App).