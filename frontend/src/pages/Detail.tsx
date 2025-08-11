import React from "react";

interface DetailProps {
  id?: string;
}

const Detail: React.FC<DetailProps> = ({ id }) => {
  // Placeholder for detail data fetch
  return (
    <div className="detail-container">
      <h2>Detail View</h2>
      <p>Detail for item with ID: {id || "N/A"}</p>
    </div>
  );
};

export default Detail;
