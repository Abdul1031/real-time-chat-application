import React from "react";
import "../styles/message.css";

export interface MessageData {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface MessageProps {
  message: MessageData;
  isOwnMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`message${isOwnMessage ? " own" : ""}`}>
      <div className="message-header">
        <span className="message-sender">{message.sender}</span>
        <span className="message-timestamp">{message.timestamp}</span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
};

export default Message;
