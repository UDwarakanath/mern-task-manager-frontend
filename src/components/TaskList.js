import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Spinner from "./Spinner";
import { URI } from "../App";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", completed: false });
  const { name } = formData;

 

  useEffect(() => {
    getTasks();
  }, []);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Input Field Cannot be Empty");
    }
    try {
      await axios.post(`${URI}/api/tasks`, formData);
      toast.success("Task Created Success Fully");
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const tasks = await axios.get(`${URI}/api/tasks`);
      setTasks(tasks.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URI}/api/tasks/${id}`);
      toast.success("Task Deleted Successfully");
      getTasks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getATask = async (task) => {
    const { name } = task;
    try {
      await setFormData({ name, completed: false });
      setTaskId(task._id);
      setIsEditing(true);
    } catch (error) {
      toast.error(error.messsage);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${URI}/api/tasks/${taskID}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
      toast.success("Task Updated successfully");
    } catch (error) {
      toast.error(`Error : ${error.message}`);
    }
  };

  const completeATask = async (task) => {
    const newFormData = {
      name: task.name,
      completed: !task.completed,
    };
    try {
      await axios.patch(
        `${URI}/api/tasks/${task._id}`,
        newFormData
      );
      newFormData.completed && toast.success("Hurray Task Completd Successfully");
      getTasks();
    } catch (error) {
      toast.error(`Error : ${error.message}`);
    }
  };
  return (
    <div>
      <div className="fixed-position">
        <h1>Task Manager App</h1>
        <TaskForm
          name={name}
          handleTaskChange={handleTaskChange}
          createTask={createTask}
          isEditing={isEditing}
          updateTask={updateTask}
        />
      </div>
      <div className="divider">
        <p>
          Total Tasks : <b color="grey">{tasks.length}</b>
        </p>
        <p>
          Completed Tasks :{" "}
          <b>{tasks.filter((item) => item.completed).length}</b>
        </p>
      </div>
      <br />
      <hr></hr>
      <br />
      {isLoading && (
        <div className="use_spinner">
          <Spinner />
        </div>
      )}

      {!isLoading && tasks.length === 0 ? (
        <p className="use_spinner">No Tasks are added Please add some tasks</p>
      ) : (
        <>
          {tasks.map((item, index) => (
            <Task
              key={item._id}
              task={item}
              index={index}
              deleteTask={deleteTask}
              getATask={getATask}
              completeATask={completeATask}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default TaskList;
