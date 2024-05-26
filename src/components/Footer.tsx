import React from "react";

interface FooterProps {
  activeTasks: number;
  finishedTasks: number;
}

const Footer: React.FC<FooterProps> = ({ activeTasks, finishedTasks }) => {
  return (
    <footer>
      <div className="container footer-block">
        <p className="footer-text">Active tasks: {activeTasks}</p>
        <p className="footer-text">Finished tasks: {finishedTasks}</p>
        <p className="footer-text">Kanban board by , </p>
      </div>
    </footer>
  );
};

export default Footer;
