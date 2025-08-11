import React, { useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import "../styles/profile.css";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const loggedInUser = localStorage.getItem("userName") || "";
  const users: any[] = JSON.parse(localStorage.getItem("users") || "[]");
  let profileUser = null;
  if (id) {
    profileUser = users.find(
      (u: any) => u.userName.toLowerCase() === id.toLowerCase() || u.id === id
    );
  } else {
    profileUser = users.find((u: any) => u.userName === loggedInUser);
  }
  const [userName, setUserName] = useState(profileUser?.userName || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const isOwnProfile = !id || id === loggedInUser;

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const userIndex = users.findIndex((u: any) => u.userName === userName);
    if (userIndex !== -1) {
      users[userIndex].password = password;
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("Password updated successfully");
    } else {
      setMessage("User not found");
    }
  };

  if (!profileUser) {
    return (
      <div className="profile-container">
        <div className="profile-card">User not found.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div
        className="profile-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#4caf50",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ margin: 0 }}>{userName}</h2>
        {isOwnProfile ? (
          <form
            className="profile-form"
            onSubmit={handleUpdate}
            style={{ width: "100%", maxWidth: 320 }}
          >
            <input type="text" value={userName} disabled />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Update Password</button>
            {message && <div className="message">{message}</div>}
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
