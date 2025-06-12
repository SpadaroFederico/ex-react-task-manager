import React, { useState, useRef } from 'react';
import Modal from './Modal';

function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const editFormRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      status,
    };
    onSave(updatedTask);
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
      title="Modifica Task"
      confirmText="Salva"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <div>
            <label>Titolo</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label>Descrizione</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label>Stato</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      }
    />
  );
}

export default EditTaskModal;
