import React from "react";

function TaskForm({
  createTask,
  name,
  handleTaskChange,
  isEditing,
  updateTask,
}) {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleTaskChange}
        placeholder="Please Enter The Task"
        className="task-input"
      />
      <button className="task-button" onSubmit={createTask}>
        {isEditing ? "Edit" : "Add"}
      </button>
    </form>
  );
}

export default TaskForm;
