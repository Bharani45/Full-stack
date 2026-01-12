
import React,{ useState } from "react";

const ChatWidget = ({ chatUrl }) => {
  const [open, setOpen] = useState(false);

  const toggleChat = () => setOpen(!open);

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        style={{
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          fontSize: 24,
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
        }}
      >
        💬
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            width: 350,
            height: 500,
            position: "absolute",
            bottom: 70,
            right: 0,
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          <iframe
            src={chatUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Chat"
          />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
