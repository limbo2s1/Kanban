import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string | JSX.Element;
  onSaveDescription: (description: string) => void;
  initialDescription: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  initialDescription,
  onSaveDescription,
}) => {
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleClose = () => {
    onSaveDescription(description);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-task">Название задачи: {content}</p>
        <img src="./image/cross-svgrepo-com.svg" onClick={handleClose} className="close-icon" />
        <textarea
          className="description-area"
          value={description}
          onChange={handleDescriptionChange}
        >
          {description}
        </textarea>
      </div>
    </div>
  );
};

export default Modal;
