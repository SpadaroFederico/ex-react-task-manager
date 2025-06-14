import React, { useRef, useState } from "react";
import useTasks from '../hooks/UseTasks';
import '../assets/styles/AddTaskStyle.css';

function AddTask() {

  const [error,setError] = useState("");
  const [title, setTitle] = React.useState("");
  const descriptionRef = useRef("");
  const statusRef = useRef(null);
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() === "") {
      setError("Il titolo del task non può essere vuoto.");
      return;
    }

    if ( title.split("").some(char => symbols.includes(char))){
      setError("Il titolo del task non può contenere caratteri speciali.");
      return;
    }
    const newTask = {
      title: title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    }

    try {
      await addTask(newTask);
      alert("task creato con successo")

      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";

      setError("");

    } catch (error) {
      console.error("errore:" + error.message);
      
    }
  };

  return (
    <div className="general-container">
      <form onSubmit={handleSubmit}>
        <div>
        <input
          className="title" 
          type="text" 
          placeholder="Titolo del Task" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <div className="text-area">
          <textarea 
            ref={descriptionRef} 
            type="text"
            placeholder="descrizione del task"
          />
        </div>

        <div className="select">
          <select ref={statusRef} type="text" placeholder="stato del Task">
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button onClick={handleSubmit}>INVIA</button>
      </form>
    </div>
  );
}

export default AddTask;
