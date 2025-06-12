import React from 'react';
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import useTasks from '../hooks/UseTasks';

function TaskDetails (){

    const { tasks } = useContext(GlobalContext);
    const { id } = useParams();
    const task = tasks.find(t => t.id == id);
    const navigate = useNavigate ();
    const { removeTask } = useTasks();
    
    if(!task){
            return <p>task non trovata</p>
        }

    const handleDelete = async (e) => {
        e.preventDefault()
        
        try {
            await removeTask(task.id);
            alert("task eliminata con successo");
            navigate ("/");
        } catch (error) {
            alert("Errore: " + error.message);
        }     
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