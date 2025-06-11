import React, { useRef, useState } from "react";

function AddTask() {

  const [error,setError] = useState("");
  const [title, setTitle] = React.useState("");
  const descriptionRef = useRef("");
  const statusRef = useRef(null);
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Il titolo del task non può essere vuoto.");
      return;
    }

    if ( title.split("").some(char => symbols.includes(char))){
      setError("Il titolo del task non può contenere caratteri speciali.");
      return;
    }
    
    

    console.log({
    title: title,
    description: descriptionRef.current.value,
    status: statusRef.current.value,
  })};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Titolo del Task" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <textarea 
          ref={descriptionRef} 
          value={descriptionRef.current.value}
          placeholder="descrizione del task"
        />
        <select ref={statusRef} type="text" placeholder="stato del Task">
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={handleSubmit}>INVIA</button>
      </form>
    </div>
  );
}

export default AddTask;
