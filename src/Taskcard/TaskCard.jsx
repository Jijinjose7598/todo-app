import React, { useState } from "react";
import "../style.css";

function TaskCard({ task, index, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  function handleEdit() {
    setIsEditing(true);
  }

  function handleUpdate() {
    onUpdateTask(index, editedTask);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditedTask({ ...task });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  }

  function handleDelete() {
    onDeleteTask(index);
  }

  function handleStatusChange(e) {
    const newStatus = e.target.value;
    setEditedTask({ ...editedTask, status: newStatus });
    onUpdateTask(index, { ...editedTask, status: newStatus }); // Update task status in App state
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          {isEditing ? (
            <div>
              <input
                type="text"
                className="form-control mb-2"
                name="name"
                value={editedTask.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control mb-2"
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
              />
              <button className="btn btn-success mr-2" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-secondary mr-2" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          ) : (
            <div>
              <h6 className="card-title"><strong>Name:</strong> {task.name}</h6>
              <p className="card-text"><strong>Description:</strong> {task.description}</p>
              <p className="card-text"><strong>Status:</strong>
                <select
                  className="form-control select-status"
                  name="status"
                  value={editedTask.status}
                  onChange={handleStatusChange}
                >
                  <option className={task.status === "Not Completed" ? "option-not-completed" : "option-completed"} value="Not Completed">Not Completed</option>
                  
                    <option className={task.status === "Completed" ? "option-completed" : "option-not-completed"} value="Completed">Completed</option>
                </select>
              </p>
              <button className="btn btn-primary mr-2" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
