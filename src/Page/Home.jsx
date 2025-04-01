import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask('');
    }
  };

  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter((t) => t !== taskToMove);
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  // Clear a specific task from a category
  const clearTask = (category, taskToRemove) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].filter((t) => t !== taskToRemove),
    }));
  };

  // Clear all tasks from all categories
  const clearAllTasks = () => {
    setTasks({ todo: [], ongoing: [], completed: [] });
  };

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="button" className="add-task-button" onClick={addTask}>
          ADD TASK
        </button>
        <button type="button" className="clear-all-button" onClick={clearAllTasks}>
          CLEAR ALL
        </button>
      </form>

      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>To-Do Tasks</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index}>
                {t}
                <button onClick={() => moveTask('todo', 'ongoing', t)}>Move to Ongoing</button>
                <button onClick={() => moveTask('todo', 'completed', t)}>Move to Completed</button>
                <button onClick={() => clearTask('todo', t)}>Clear</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing Tasks</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index}>
                {t}
                <button onClick={() => moveTask('ongoing', 'todo', t)}>Move to To-Do</button>
                <button onClick={() => moveTask('ongoing', 'completed', t)}>Move to Completed</button>
                <button onClick={() => clearTask('ongoing', t)}>Clear</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index}>
                {t}
                <button onClick={() => moveTask('completed', 'todo', t)}>Move to To-Do</button>
                <button onClick={() => moveTask('completed', 'ongoing', t)}>Move to Ongoing</button>
                <button onClick={() => clearTask('completed', t)}>Clear</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
