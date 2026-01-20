import React, {useState, useEffect}  from "react";
import Calender from "react-calendar"
import "react-calendar/dist/Calendar.css"

function Tasks(){

    const handleClick = () =>  {
        alert("Task is added");
    }

    const [date, setDate] = useState(new Date())

    return(
        <div className="taskBoard">

            <button onClick={handleClick}>
                Add Task
            </button>

            <Calender onChange={setDate}
                      value={date}
            />

        </div>
    )
}

export default Tasks;