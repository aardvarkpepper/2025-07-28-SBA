import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  // Remember to wipe comments.
  // 'Add a search bar to search for tasks' - this is essentially what, really?
  // Add task statistics.  validation helpers.  date formatting utilities.

  /**

   * Navbar:  Add task button, sort by property
   * List filters, add filters, search function.
   * (Search function iterates through array, looking to see if search term is "includes" in title or description).  Can do "split" to separate into array, and search for multiple strings.  Alternately can accept quotation marks for exact match including space e.g. 'bell bottom' will not find bell or bottom, but only 'bell bottom'
   * 
   * Pregen tasks.
   * 
   * Tasklist, Task.  Use the filters as mentioned.
   * 
   * Form with validation.  When I make a new form, assign unique ID, and check dates(limit 10 years)
   * Error handling
   * user-friendly feedback
   * 
   * When I set state of tasklist, look through status and priority and assign unique values to the object
   * {status: Set, priority: Set} (just pop them in there), then use that object to populate dropdown. 
   * 
   * OPTIONALS
   * Probably add something like a Set for keywords.  As many keywords (categories) as you like, then can filter on them.
   * What about exclusive / inclusive filtering?  Ah . . . ugh.
   * Just keep it simple.
   * 
   * id: string;
     title: string;
     description: string;
     status: TaskStatus;
     priority: PriorityStatus;
     dueDate: string;

   */

  return (
    <>
      <div>
        Testing 
      </div>
    </>
  )
}

export default App
