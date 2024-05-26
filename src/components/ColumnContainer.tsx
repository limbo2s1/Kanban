import React, { useState } from "react";
import Select, { StylesConfig } from "react-select";
import TaskCard from "./TaskCard";
import AddCard from "./AddCard";

interface Task {
  id: number;
  task: string;
  description: string;
}

const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
    minHeight: "40px",
    marginBottom: "10px",
    "&:hover": {
      borderColor: "#888",
    },
    boxShadow: "none",
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
    borderRadius: "4px",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
    marginTop: "-5px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#e0e0e0" : state.isFocused ? "#f1f1f1" : "#fff",
    color: "black",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#e0e0e0",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "black",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0 8px",
  }),
};

interface ColumnContainerProps {
  title: string;
  tasks: Task[];
  previousTasks: Task[];
  onAddTask: (task: string) => void;
  onDeleteTask: (taskId: number, columnName: string) => void;
  onUpdateTaskDescription: (id: number, description: string) => void;
}

const ColumnContainer: React.FC<ColumnContainerProps> = ({
  title,
  tasks,
  previousTasks,
  onAddTask,
  onDeleteTask,
  onUpdateTaskDescription,
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddClick = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleSaveTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(newTask);
      setInputVisible(false);
      setNewTask("");
    } else if (selectedTask) {
      onAddTask(selectedTask.task);
      onDeleteTask(selectedTask.id, getPreviousColumnName(title));
      setInputVisible(false);
      setSelectedTask(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveTask();
    }
  };

  const handleDeleteTask = (taskId: number) => {
    onDeleteTask(taskId, title);
  };

  const getPreviousColumnName = (currentColumn: string): string => {
    switch (currentColumn) {
      case "Ready":
        return "Backlog";
      case "In Progress":
        return "Ready";
      case "Finished":
        return "In Progress";
      default:
        return "";
    }
  };

  const taskOptions = previousTasks.map((task) => ({
    value: task.id,
    label: task.task,
  }));

  const handleSelectChange = (selectedOption: any) => {
    const task = previousTasks.find((task) => task.id === selectedOption.value) || null;
    setSelectedTask(task);
  };

  return (
    <li className="column-container list-item">
      <p className="backlog">{title}</p>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDeleteTask={() => handleDeleteTask(task.id)}
            onUpdateTaskDescription={onUpdateTaskDescription}
          />
        ))}
      </div>
      {inputVisible && (
        <div className="second-type">
          {title === "Backlog" ? (
            <input
              type="text"
              className="input-task"
              placeholder="Enter a task..."
              value={newTask}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <Select
              options={taskOptions}
              styles={customStyles}
              onChange={handleSelectChange}
              value={selectedTask ? { value: selectedTask.id, label: selectedTask.task } : null}
            />
          )}
          <button onClick={handleSaveTask} className="btn-task">
            Send
          </button>
        </div>
      )}
      {!inputVisible && <AddCard onClick={handleAddClick} />}
    </li>
  );
};

export default ColumnContainer;
