import React from "react";

interface AddCardProps {
  onClick: () => void;
}

const AddCard: React.FC<AddCardProps> = ({ onClick }) => {
  return (
    <button className="block-input " onClick={onClick}>
      <img className="plus" src="./image/add-card.svg" alt="Add card" />
      <p className="add-text">Add card</p>
    </button>
  );
};

export default AddCard;
