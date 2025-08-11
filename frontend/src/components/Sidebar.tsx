import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export interface Contact {
  id: string;
  name: string;
}

interface SidebarProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
}) => {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <h2
        style={{
          padding: "18px 0 12px 0",
          fontWeight: 600,
          fontSize: "1.2rem",
          color: "#222",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Contacts
      </h2>
      <ul className="sidebar-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`sidebar-item${
              selectedContactId === contact.id ? " active" : ""
            }`}
            onClick={() => onSelectContact(contact.id)}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <div
              className="sidebar-avatar"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${contact.id}`);
              }}
              style={{ cursor: "pointer" }}
              title={`View ${contact.name}'s profile`}
            >
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <span className="sidebar-name">{contact.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
