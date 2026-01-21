import React, {useState, useEffect}  from "react";

function Tasks(){

    const [taskMode, setTaskMode] = useState("idle");
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")

    return(
        <div className="taskBoard">

            <h2>Tasks</h2>
            <button onClick={() => setTaskMode("Choose")}>
                Add Task
            </button>           
    
        </div>
    )
}

export default Tasks;