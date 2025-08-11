import React, { useState, useEffect } from "react";
import Sidebar, { Contact } from "../components/Sidebar";
import Message, { MessageData } from "../components/Message";
import ChatBox from "../components/ChatBox";
import "../styles/chat.css";

const mockContacts: Contact[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

// Store chat history per contact in localStorage
const getInitialChats = () => {
  const data = localStorage.getItem("chats");
  if (data) return JSON.parse(data);
  // Default: each contact has a welcome message
  const initial = {
    "1": [
      { id: "1", sender: "Alice", content: "Hi there!", timestamp: "10:00" },
    ],
    "2": [{ id: "1", sender: "Bob", content: "Hello!", timestamp: "10:01" }],
    "3": [
      { id: "1", sender: "Alice", content: "How are you?", timestamp: "10:02" },
    ],
  };
  localStorage.setItem("chats", JSON.stringify(initial));
  return initial;
};

const Chat: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string>(
    mockContacts[0].id
  );
  const [chats, setChats] = useState<{ [contactId: string]: MessageData[] }>(
    getInitialChats()
  );

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const handleSend = (message: string) => {
    if (!selectedContactId) return;
    const sender = localStorage.getItem("userName") || "Me";
    setChats((prev) => {
      const prevMsgs = prev[selectedContactId] || [];
      const newMsg: MessageData = {
        id: (prevMsgs.length + 1).toString(),
        sender,
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      return {
        ...prev,
        [selectedContactId]: [...prevMsgs, newMsg],
      };
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 100px)",
        background: "#ece5dd",
        borderRadius: 10,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        overflow: "hidden",
        margin: "30px auto",
        width: "85vw",
        maxWidth: "85vw",
        minWidth: 320,
      }}
    >
      <div
        style={{ flexBasis: "30%", minWidth: 0, maxWidth: 350, height: "100%" }}
      >
        <Sidebar
          contacts={mockContacts}
          selectedContactId={selectedContactId}
          onSelectContact={setSelectedContactId}
        />
      </div>
      <div
        style={{
          flexBasis: "70%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          height: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: 24,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "#ece5dd",
          }}
        >
          {(chats[selectedContactId]?.length ?? 0) === 0 ? (
            <div style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
              <h3>Welcome to the chat!</h3>
              <p>Select a contact and start messaging.</p>
            </div>
          ) : (
            chats[selectedContactId].map((msg) => (
              <Message
                key={msg.id}
                message={msg}
                isOwnMessage={
                  msg.sender === (localStorage.getItem("userName") || "Me")
                }
              />
            ))
          )}
        </div>
        <div
          style={{
            padding: 16,
            background: "#f7f7f7",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <ChatBox onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
