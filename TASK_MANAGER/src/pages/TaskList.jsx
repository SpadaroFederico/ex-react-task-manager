import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import '../assets/styles/TaskListStyle.css'
import TaskRow from "../components/TaskRow";

// contesto globale per accedere ai dati ricavanti dal BE

const TaskList = () => {
    const { tasks } = useContext(GlobalContext);

    return (
        <div>
            <h2>Lista Task</h2>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                    </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;