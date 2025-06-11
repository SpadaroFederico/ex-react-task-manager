import React from 'react';
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function TaskDetails (){

    const { tasks } = useContext(GlobalContext);
    const { id } = useParams();
    const task = tasks.find(t => t.id == id);
    
    if(!task){
            return <p>task non trovata</p>
        }

    const handleDelete = (e) => {
        e.preventDefault()
        console.log("task eliminata");        
    }

    return(
        <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.createdAt}</p>
            <button onClick={handleDelete}>RIMUOVI</button>
        </div>
    )
};

export default TaskDetails;