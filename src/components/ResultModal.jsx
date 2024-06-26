import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "#f5f8fa",
                    height: 480,
                    width: 640,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}
            >
                {children}
                <button style={{marginTop: 100,  backgroundColor: 'black', color: '#f5f8fa'}} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
