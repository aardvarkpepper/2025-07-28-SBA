## Notes

npx tsc to compile typescript after typescript edits, particularly anything involving types.  (Must compile).  Note types defined at compilation also means type aliases cannot dyanmically be defined at runtime, e.g. on user data.

Particularly, test items using keyof if user ever has ability to add things that are affected by keyof.  For this project, I don't think that will apply; users can customize values but can't enter new keys.

onSubmitFormTask uses submit new task in Dashboard/TaskFormContainer/Taskform, but uses edit task in TaskList/Task.

## Tests

Test what happens when adding a new task with a new "status" type.  Does the status dropdown populate?  What happens when a "status" type is deleted?  Does the status dropdown depopulate?  What about changing a task?  Creation, update, and deletion of items should affect 'tasklist' state so re-render, causing re-calculation of the data component populating those dropdowns.  However, possibly React may not re-render some components (so may not reload App).