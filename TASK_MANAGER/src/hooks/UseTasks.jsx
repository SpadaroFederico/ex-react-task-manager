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
  const addTask = (task) => {};       // POST /tasks
  const removeTask = (taskId) => {};  // DELETE /tasks/:id
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