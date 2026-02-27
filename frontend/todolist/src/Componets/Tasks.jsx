import React, {useState, useEffect}  from "react";
import "./Tasks.css"

function Tasks(){

    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [newTask, setNewTask] = useState("")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [startTime, setStrtTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks")
        const data = await res.json()
        setTasks(data)
    }

    const submitTask = async () => {

        await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                title,
                description,
                start_time: startTime,
                end_time: endTime
            })
        })

        setShowForm(false);
        fetchTasks();
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return(
        <div className="taskBoard">

            <h2>Tasks Menu</h2>
            <button onClick={() => setShowForm(true)}>
                Add Task
            </button>
            
            {showForm && (
                <div className="Cards">

                <input 
                 placeholder="Task Title"
                 value={title}
                 onChange={e => setTitle(e.target.value)}
                />

                <textarea 
                 placeholder="Description"
                 onChange={e => setDescription(e.target.value)}
                />

                <input 
                 type="datetime-local"
                 onChange={e => setStrtTime(e.target.value)}
                />

                <input 
                 type="datetime-local"
                 onChange={e => setEndTime(e.target.value)}
                />

                <button onClick={submitTask} 
                 saveTask
                />

                </div>

            )}

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