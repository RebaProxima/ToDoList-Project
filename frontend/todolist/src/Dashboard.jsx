import React, {useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {

    const [profile, setProfile] = useState(null);
    const [activePage, setActivePage] = useState("Overview");
    const [time, setTime] = useState(new Date());

    useEffect( () => {
        fetch("http://localhost:5000/")
        .then(res => res.text())
        .then(data => console.log("FROM SERVER:", data))
        .catch(err => console.err(err))
    }, [] );

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

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
          <div className="nav-item active">Profile</div>
          <div className="nav-item">Graphs</div>
          <div className="nav-item">Tasks</div>
          <div className="nav-item">Self Reflection</div>
          <div className="nav-item">Help</div>
        </aside>

        {/* FULL SCREEN CONTENT */}
        <section className="content">
          <div className="screen">

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

            <div className="task-cards">

              <div className="task-card overdue">
                <h3>Overdue</h3>
                <ul>
                  <li>Task 1</li>
                  <li>Task 2</li>
                </ul>
              </div>

              {/*
              <div className="card">Details</div>
              <div className="card">Details</div>
              */}

              
              
            </div>

          </div>
        </section>

      </div>

    </div>
    )

}

export default Dashboard