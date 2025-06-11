import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("🌍 URL API:", `${apiUrl}/tasks`);


      useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${apiUrl}/tasks`);
        if (!res.ok) throw new Error("Errore nel caricamento dei task");
        const data = await res.json();
        setTasks(data);
        console.log("Task caricati:", data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [apiUrl]);

    return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}




