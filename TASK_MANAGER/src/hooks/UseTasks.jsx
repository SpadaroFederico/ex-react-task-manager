import { useState, useEffect } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Funzione per il fetch dei task
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${apiUrl}/tasks`);
      if (!res.ok) throw new Error("Errore nel fetch");
      const data = await res.json();
      setTasks(data);
      console.log("✅ Tasks caricati:", data);
    } catch (error) {
      console.error("❌ Errore useTasks:", error);
    }
  };
  
  // Carica i task al primo render
  useEffect(() => {
    fetchTasks();
  }, [apiUrl]);

  // Funzioni da esporre (per ora vuote)
 const addTask = async (newTask) => {
  try {
    const res = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const result = await res.json();

    if (result.success) {
      setTasks((prevTasks) => [...prevTasks, result.task]);
    } else {
      throw new Error(result.message);
    }

  } catch (error) {
    console.error("Errore durante l'aggiunta del task:", error);
    throw error;
  }
};

  const removeTask = async (taskId) => {
    try {
        const res = await fetch (`${apiUrl}/tasks/${taskId}`, {
            method: "DELETE",
        })

    const result = await res.json()

    if (result.success) {
        setTasks((prevTasks) => prevTasks.filter(t => t.id !== taskId))
    }else{
        throw new Error(result.message);
    }

    } catch (error) {
        console.error("Errore durante la rimozione del task:" ,error);
        throw error;
    }
  };  // DELETE /tasks/:id
  const updateTask = (task) => {};    // PUT /tasks/:id

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    updateTask,
    fetchTasks, // Utile per ricaricare i task
  };
}