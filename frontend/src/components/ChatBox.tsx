import React, { useState, FormEvent } from "react";
import "../styles/chat.css";

interface ChatBoxProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSend, disabled = false }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form className="chat-box" onSubmit={handleSubmit} style={{ margin: 0 }}>
      <div
        className="chat-input"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={disabled}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 24,
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "1rem",
            background: "#fff",
          }}
        />
        <button
          type="submit"
          className="send-btn"
          disabled={disabled || !input.trim()}
          style={{
            padding: "10px 22px",
            background: "#25d366",
            color: "white",
            border: "none",
            borderRadius: 24,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "1rem",
            transition: "background 0.2s",
          }}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatBox;
