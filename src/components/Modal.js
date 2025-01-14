import React from "react";

const Modal = ({ title, children, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose} style={styles.closeButton}>
            &times;
          </button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    marginBottom: "15px",
    paddingBottom: "10px",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  body: {
    marginTop: "15px",
  },
};

export default Modal;
