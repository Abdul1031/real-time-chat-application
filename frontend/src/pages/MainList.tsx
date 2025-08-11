import React, { useState } from "react";

interface Item {
  id: string;
  name: string;
}

const MainList: React.FC = () => {
  const [items] = useState<Item[]>([
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ]);

  return (
    <div className="main-list-container">
      <h2>Main List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainList;
