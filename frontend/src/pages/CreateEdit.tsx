import React, { useState, FormEvent } from "react";

interface CreateEditProps {
  initialName?: string;
  onSave?: (name: string) => void;
}

const CreateEdit: React.FC<CreateEditProps> = ({
  initialName = "",
  onSave,
}) => {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(name);
    }
  };

  return (
    <div className="create-edit-container">
      <form className="create-edit-form" onSubmit={handleSubmit}>
        <h2>{initialName ? "Edit Item" : "Create Item"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{initialName ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateEdit;
