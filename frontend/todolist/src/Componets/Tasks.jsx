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
    const [showTasks, setShowTasks] = useState(false)

    const fetchTasks = async () => {

        try{
            const res = await fetch("http://localhost:5000/tasks")
            const data = await res.json()
            const now = new Date()

            const updatedTasks = data.map(task => {
                if(!task.completed && task.end_time && new Date(task.end_Time) < now){
                    task.completed = true
                }
                return task
            })

            setTasks(updatedTasks)
            console.log(updatedTasks)
        } catch(err){
            console.log(err)
        }
        
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

        console.log(title, description, startTime, endTime)

        setShowForm(false);
        fetchTasks();
    }


    const deleteTask = async (id) => {
        
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        })
        fetchTasks()
    }

    const completeTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}/complete`,{
            method: "PUT"
        })

        fetchTasks()
    }

    const editTask = async (task) =>{
        const newTitle = prompt("New Title", task.title)
        const newDescription = prompt("New Description", task.description)
        const newStart = prompt("New Start Time", task.start_time)
        const newEnd = prompt("New End Time", task.end_time)


        if(!newTitle) return

        await fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            start_time: newStart,
            end_time: newEnd
            })
        })

    fetchTasks()
    }

    return(
        <div className="taskBoard">

            <h2>Tasks Menu</h2>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close" : "Add Task"}
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

                <button onClick={submitTask}>
                    saveTask
                </button> 
                 

                </div>
            )}

            {tasks
            .filter(task => !task.completed)
            .map(task => (
                <div className="Cards" key={task.id}>

                    <h3>{task.title}</h3>

                    <p>
                        Task Description:
                        {task.description || "No description for the task"}
                    </p>

                    <p>
                        Starting:
                        {task.start_time
                        ? new Date(task.start_time).toLocaleString()
                        : "Not set"}
                    </p>

                    <p>
                        Ending:
                        {task.end_time
                        ? new Date(task.end_time).toLocaleString()
                        : "Not set"}
                    </p>

                    <p>
                        Completed:
                        {task.completed ? "✅" : "❌"}
                    </p>

                    <button onClick={() => deleteTask(task.id)}>
                      Delete
                     </button>

                    <button onClick={() => completeTask(task.id)}>
                      {task.completed ? "☑ Completed" : "⬜ Complete"}
                    </button>

                    <button onClick={() => editTask(task)}>
                     Edit
                    </button>
                
                </div>
            ))

            }

            <button onClick={() => {
                if(showTasks){
                    setTasks([])
                    setShowTasks(false)
                }else{
                    fetchTasks()
                    setShowForm(true)
                }

            }}>
                {showTasks ? "Hide Tasks" : "Show TAsks"}
            </button>
            {/*

            Demo data of how the tasks should look like

            <div className="Cards">
                
               <h3>Name of the Task</h3>
               <p> Time for the Task</p>
               <p>Starting: at the certain time </p>
               <p>Completed: Certain time </p>
               <p> Task Description </p>
            </div>  

            <div className="Cards">
                <p>DEMO</p>
               <h3>Name of the Task</h3>
               <p> Time for the Task</p>
               <p>Starting: at the certain time </p>
               <p>Completed: Certain time </p>
               <p> Task Description </p>
            </div>
            
            */}
    
        </div>
    )
}

export default Tasks;