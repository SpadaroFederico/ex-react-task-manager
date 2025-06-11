import { createContext } from "react";
import useTasks from '../hooks/UseTasks'; // Importa il custom hook

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // Usa il custom hook per gestire la logica
  const { tasks, setTasks, addTask, removeTask, updateTask, fetchTasks } = useTasks();

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        removeTask,
        updateTask,
        fetchTasks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}