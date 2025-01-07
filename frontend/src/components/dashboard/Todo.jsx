import React, { useState } from "react";
import './dashboard.css';

const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Short task goes here...", completed: false },
    { id: 2, text: "Short task goes here...", completed: false },
    { id: 3, text: "Short task goes here...", completed: true },
    { id: 4, text: "Short task goes here...", completed: false },
    { id: 5, text: "Short task goes here...", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        <div className="todo-header">
          <h6 className="todo-title">To Do List</h6>
          <a href="#!" className="todo-link">Show All</a>
        </div>
        <div className="todo-input-wrapper">
          <input
            className="todo-input"
            type="text"
            placeholder="Enter task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            type="button"
            className="todo-add-btn"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="todo-item"
          >
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <div className="todo-content">
              <span className="todo-text">
                {task.completed ? <del>{task.text}</del> : task.text}
              </span>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
