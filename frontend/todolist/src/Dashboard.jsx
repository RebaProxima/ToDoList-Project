import React, {useState, useEffect } from "react";
import "./Dashboard.css";
import Tasks from "./Componets/Tasks.jsx";
import SelfReflection from "./Componets/SelfReflection.jsx";

function Dashboard() {

    const [activeSection, setActiveSection] = useState("dashboard");
    const [time, setTime] = useState(new Date());
    const [tasks, setTasks] = useState([]);

    useEffect( () => {
        fetch("http://localhost:5000/")
        .then(res => res.text())
        .then(data => console.log("FROM SERVER:", data))
        .catch(err => console.error(err))
    }, [] );

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);


    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5000/tasks")
      const data = await res.json();
      setTasks(data);
    }

    useEffect(() => {
      fetchTasks()
    }, [])

    const today = new Date()

    const overdueTasks = tasks.filter(task => {
      

      return new Date(task.start_time) < today
    })

    const todayTasks = tasks.filter(task => {
      if(!task.start_time){
        return false
      }

      const taskDate = new Date(task.start_time)

      return taskDate.toDateString() === today.toDateString()

    })

    const tomorrowTasks = tasks.filter(task => {
      if(!task.start_time){
        return false
      }

      const taskDate = new Date(task.start_time)

      const tomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1)

      return taskDate.toDateString() === tomorrow.toDateString()
    })

    return (
      <div className="dashboard">

      {/* Top Header */}
      <header className="topbar">
        <div className="logo">MyApp</div>
        <div className="user">Reba</div>
      </header>

      {/* Main Area */}
      <div className="main">

        {/* Sidebar */}
        <aside className="sidebar">
          <div 
            className={`nav-item ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </div>

          <div
           className={`nav-item ${activeSection === "tasks" ? "active" : ""}`}
           onClick={() => setActiveSection("tasks")}
          >
            Tasks
            </div>

          <div 
            className={`nav-item ${activeSection === "selfReflection" ? "active" : ""}`}
            onClick={() => setActiveSection("selfReflection")}
          >
            Self Reflection
          </div>

        </aside>

        

        {/* FULL SCREEN CONTENT */}
        <section className="content">
          <div className="screen">

            {activeSection === "dashboard" && (
              <>
              <div className="profile-top">
              <div>
                <h1>Reba</h1>
                <h2>Goals</h2>
                <p>Add goals here, it can be few and then you can click more to view more</p>
                <p>Currenly focusing on Reaact</p>
                <p>Currenly focusing on Reaact</p>
                <p>Currenly focusing on Reaact</p>
                <p>Currenly focusing on Reaact</p>
                <p>Currenly focusing on Reaact</p>
                <p>Currenly focusing on Reaact</p>
                <p>Currenly focusing on Reaact</p>
                <p>Currenly focusing on Reaact</p>
                <p>Currenly focusing on Reaact</p>
              </div>

              <div className="time">
                {time.toLocaleDateString()} <br />
                {time.toLocaleTimeString()}
              </div>
            </div>



            <button onClick={fetchTasks}>
              Most Recent Tasks Added
            </button>


            <div className="task-cards">

              <div className="task-card overdue">
                <h3>Overdue</h3>
                <ul>
                  {overdueTasks.slice(0,3).map(task => (
                    <li key={task.id}>
                      {task.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="task-card today">
                <h3>Today</h3>
                <ul>
                  {todayTasks.slice(0,3).map(task => (
                    <li key={task.id}>
                      {task.title}
                    </li>

                  ))}
                  <li>Task 3</li>
                  
                </ul>
              </div>

              <div className="task-card">
                <h3>Tomorrow</h3>
                <ul>
                  <li>Task 5</li>
                  <li>Task 6</li>
                </ul>
              </div>

             </div>
            </>
            ) }
            {activeSection === "graphs" && <Graphs />}
            {activeSection === "tasks" && <Tasks />}
            {activeSection === "selfReflection" && <SelfReflection />}
            {activeSection === "help" && <Help />}

          </div>
        </section>

      </div>

    </div>
    )

}

export default Dashboard