import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import useTasks from '../hooks/UseTasks';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';

function TaskDetails() {
  const { tasks } = useContext(GlobalContext);
  const { id } = useParams();
  const task = tasks.find(t => t.id == id);
  const navigate = useNavigate();
  const { removeTask, updateTask } = useTasks();

  const [showModal, setShowModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!task) {
    return <p>Task non trovata</p>;
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo");
      navigate("/");
    } catch (error) {
      alert("Errore: " + error.message);
    }
  };

  const handleSave = async (updatedTaskData) => {
    try {
      await updateTask(updatedTaskData);
      alert("Task aggiornata con successo");
      setIsEditModalOpen(false);
    } catch (error) {
      alert("Errore durante l'aggiornamento: " + error.message);
    }
  };

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <p>{task.createdAt}</p>

      <button onClick={() => setShowModal(true)}>Rimuovi Task</button>
      <button onClick={() => setIsEditModalOpen(true)}>Modifica Task</button>

      <EditTaskModal
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onSave={handleSave}
      />

      <Modal
        show={showModal}
        title="Conferma eliminazione"
        content={`Stai per eliminare il task: ${task.title}`}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
    </div>
  );
}

export default TaskDetails;
