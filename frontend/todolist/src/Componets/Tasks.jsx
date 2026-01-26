import React, {useState, useEffect}  from "react";
import "./Tasks.css"

function Tasks(){

    

    const addTask = async () => {
        await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: "My first real task"})
        })
    }

    return(
        <div className="taskBoard">

            <h2>Tasks Menu</h2>
            <button onClick={addTask}>
                Add Task
            </button>

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