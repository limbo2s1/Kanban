// TaskCard.tsx
import React, { useState } from "react";
import Modal from "./Modal";

interface Task {
  id: number;
  task: string;
  description: string;
}

interface TaskCardProps {
  task: Task;
  onDeleteTask: () => void;
  onUpdateTaskDescription: (id: number, description: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDeleteTask, onUpdateTaskDescription }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleTaskClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteTask = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    onDeleteTask();
  };

  const handleSaveDescription = (description: string) => {
    onUpdateTaskDescription(task.id, description);
  };

  return (
    <div className="block-task" onClick={handleTaskClick}>
      <p className="task">{task.task}</p>
      <img src="./image/cross-svgrepo-com.svg" className="cross" onClick={handleDeleteTask} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={task.task}
        initialDescription={task.description}
        onSaveDescription={handleSaveDescription}
      />
    </div>
  );
};

export default TaskCard;
