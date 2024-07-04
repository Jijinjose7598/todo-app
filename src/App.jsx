import React, { useState, useEffect } from "react";
import "./style.css"; // Import your style.css file
import TaskCard from "./Taskcard/TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: "", description: "", status: "Not Completed" });
  const [taskIdCounter, setTaskIdCounter] = useState(1); // Initialize task id counter
  const [taskType, setTaskType] = useState("All"); // Initialize taskType correctly
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(function() {
    // Set filteredTasks initially to all tasks
    setFilteredTasks(tasks);
  }, [tasks]);

  function handleTaskSubmit() {
    const newTask = { ...task, id: taskIdCounter }; // Assign current taskIdCounter as id
    setTasks([...tasks, newTask]);
    setTask({ name: "", description: "", status: "Not Completed" }); // Default status to "Not Completed"
    setTaskIdCounter(taskIdCounter + 1); // Increment taskIdCounter for the next task
    console.log(newTask);
  }

  function handleUpdateTask(index, updatedTask) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  }

  function handleDeleteTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  function handleFilterChange(e) {
    const selectedType = e.target.value;
    setTaskType(selectedType); // Update selected task type

    if (selectedType === "All") {
      setFilteredTasks(tasks); // Show all tasks
    } else {
      const filtered = tasks.filter(function(task) {
        return task.status === selectedType;
      });
      setFilteredTasks(filtered);
    }
  }

  function handleChangeTaskName(value) {
    setTask({ ...task, name: value });
  }

  function handleChangeTaskDescription(value) {
    setTask({ ...task, description: value });
  }

  return (
    <div className="main-container">
      <div className="container mt-5">
        <h4 className="heading mb-4">My Todo</h4>
        <div className="d-flex mb-3">
          <div className="name-input mr-3">
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={task.name}
              onChange={function(e) {
                handleChangeTaskName(e.target.value);
              }}
            />
          </div>
          <div className="description-input mr-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={task.description}
              onChange={function(e) {
                handleChangeTaskDescription(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={handleTaskSubmit}>
            Add Todo
          </button>
        </div>
        <div className="middle-area d-flex">
          <div>
            <h6 className="task-heading1">My Todos</h6>
          </div>
          <div>
            <h6 className="task-heading2">Status Filter:
              <select className="drop-down" value={taskType} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Not Completed">Not Completed</option>
                <option value="Completed">Completed</option>
              </select>
            </h6>
          </div>
        </div>
        <div className="row">
          {filteredTasks.map(function(task, index) {
            return (
              <TaskCard
                key={`${task.id}`}
                task={task}
                index={index}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
