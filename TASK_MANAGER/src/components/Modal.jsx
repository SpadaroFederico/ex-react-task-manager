import React from "react";
import ReactDOM from "react-dom";

function Modal ({show, title, content, onConfirm, onClose, confirmText="Conferma"}){
    if (!show) return null;
        
    return ReactDOM.createPortal(
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>{title}</h2>
                <p>{content}</p>

                <div style={styles.actions}>
                    <button onClick={onClose} style={styles.cancel}>Annulla</button>                    
                    <button onClick={onConfirm} style={styles.confirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
}

const styles = {
    
    overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    maxWidth: "90%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px"
  },
  cancel: {
    backgroundColor: "#ccc",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  confirm: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer"
  }
}

export default Modal;