import {FaCheckDouble,FaEdit,FaTrash} from "react-icons/fa"

function Task({task,index,deleteTask,getATask,completeATask}) {

  return (
    <div className={task.completed ? "task completed": "task"}>
        <p>
            <b>{index+1} . </b>
            {task.name}
        </p>
        <p className="icons">
            <FaCheckDouble color="green" style={{cursor:"pointer"}}  onClick={()=>completeATask(task)}/>
            <FaEdit color="brown" style={{cursor:"pointer"}} onClick={()=>getATask(task)}/>
            <FaTrash color="red" style={{cursor:"pointer"}} onClick={()=>deleteTask(task._id)}/>
        </p>
    </div>
  )
}

export default Task