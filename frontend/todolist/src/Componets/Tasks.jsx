import React, {useState, useEffect}  from "react";
import "./Tasks.css"

function Tasks(){

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")

    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks")
        const data = await res.json()
        setTasks(data)
    }

    const addTask = async () => {

        if(!newTask) return

        await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: newTask})
        })

        setNewTask("")
        fetchTasks();
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return(
        <div className="taskBoard">

            <h2>Tasks Menu</h2>
            <button onClick={addTask}>
                Add Task
            </button>
            
            <div className="Cards">
               <input 
                 value={newTask}
                 onChange={e => setNewTask(e.target.value)}
                 placeholder="Enter task"
               />
            </div> 

            <div className="Cards">
               <h3>Name of the Task</h3>
               <p> Time for the Task</p>
               <p>Starting: at the certain time </p>
               <p>Completed: Certain time </p>
               <p> Task Description </p>
            </div>  

            <div className="Cards">
               <h3>Name of the Task</h3>
               <p> Time for the Task</p>
               <p>Starting: at the certain time </p>
               <p>Completed: Certain time </p>
               <p> Task Description </p>
            </div>          
    
        </div>
    )
}

export default Tasks;