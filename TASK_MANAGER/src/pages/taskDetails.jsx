import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import useTasks from '../hooks/UseTasks';
import Modal from '../components/Modal';

function TaskDetails (){

    const { tasks } = useContext(GlobalContext);
    const { id } = useParams();
    const task = tasks.find(t => t.id == id);
    const navigate = useNavigate ();
    const { removeTask } = useTasks();
    const [showModal, setShowModal] = useState(false);
    
    if(!task){
            return <p>task non trovata</p>
        }

    const handleDelete = async () => {
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
            <button onClick={() => setShowModal(true)}>RIMUOVI</button>
            <Modal
                show={showModal}
                title="Conferma eliminazione"
                content={`Stai provando a eliminare il task: ${task.title}?`}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />
        </div>

        
    )
};

export default TaskDetails;