import React, {useState, useEffect} from "react";
import "./SelfReflection.css"

function Profile(){ 

    return(
        <div className="Reflection">
            <h1>Feedback of tasks</h1>

            <div className="FeedbackCards">
                <div className="Card">
                    <h2>Task Heading</h2>
                    <p>Task Status: Completed / Not</p>
                    <p>Feedback</p>
                </div>
            </div>
        </div>

    )
}

export default Profile