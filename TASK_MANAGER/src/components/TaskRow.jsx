import React from "react";
import { Link } from "react-router-dom";

// variabile per gestire lo stile in base allo stato del task

const getStatusStyle = (status) => {
  const styles = {
    padding: '8px',
    borderRadius: '4px',
    color: 'white',
    textAlign: 'center'
  };

  switch (status) {
    case 'To do' :
        return { ...styles, backgroundColor: 'red' };
    case 'Doing' :
        return { ...styles, backgroundColor: 'orange' };
    case 'Done' :
        return { ...styles, backgroundColor: 'green' };
    default:
        return styles
  }
};

const TaskRow = React.memo(({ task }) => {
    return (
        <tr>
            <td>
                <Link to={`/task/${task.id}`}>{task.title}</Link>
            </td>
            <td>
                <div style={getStatusStyle(task.status)}>
                    <Link to={`/task/${task.id}`}>{task.status}</Link>
                </div>
            </td>
            <td>
                <Link to={`/task/${task.id}`}>{new Date (task.createdAt).toLocaleDateString()}</Link>
            </td>
        </tr>
    );
});

export default TaskRow;