import React, { useState, useEffect } from "react";
import ColumnContainer from "./ColumnContainer";

interface Task {
  id: number;
  task: string;
  description: string;
}

interface Column {
  title: string;
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  previousTasks: Task[];
}

const Main: React.FC<{ updateTaskCounts: () => void }> = ({ updateTaskCounts }) => {
  const [backlog, setBacklog] = useState<Task[]>([]);
  const [ready, setReady] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [finished, setFinished] = useState<Task[]>([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    if (tasksLoaded) {
      columns.map((item) => localStorage.setItem(item.title, JSON.stringify(item.tasks)));
      updateTaskCounts();
    }
  }, [backlog, ready, inProgress, finished, tasksLoaded]);

  useEffect(() => {
    columns.map((item) => {
      const stored: string | null = localStorage.getItem(item.title.trim());
      item.setTasks(JSON.parse(stored || "[]"));
    });

    setTasksLoaded(true);
  }, []);

  const handleAddTask = (columnName: string, newTask: string) => {
    const newTaskObj: Task = { id: Date.now(), task: newTask, description: "" };
    switch (columnName) {
      case "Backlog":
        setBacklog((prevBacklog) => [...prevBacklog, newTaskObj]);
        break;
      case "Ready":
        setReady((prevReady) => [...prevReady, newTaskObj]);
        break;
      case "In Progress":
        setInProgress((prevInProgress) => [...prevInProgress, newTaskObj]);
        break;
      case "Finished":
        setFinished((prevFinished) => [...prevFinished, newTaskObj]);
        break;
      default:
        break;
    }
  };

  const handleDeleteTask = (taskId: number, columnName: string) => {
    switch (columnName) {
      case "Backlog":
        setBacklog((prevBacklog) => prevBacklog.filter((task) => task.id !== taskId));
        break;
      case "Ready":
        setReady((prevReady) => prevReady.filter((task) => task.id !== taskId));
        break;
      case "In Progress":
        setInProgress((prevInProgress) => prevInProgress.filter((task) => task.id !== taskId));
        break;
      case "Finished":
        setFinished((prevFinished) => prevFinished.filter((task) => task.id !== taskId));
        break;
      default:
        break;
    }
  };

  const handleUpdateTaskDescription = (id: number, description: string) => {
    const updateTask = (tasks: Task[]) =>
      tasks.map((task) => (task.id === id ? { ...task, description } : task));

    setBacklog((prevTasks) => updateTask(prevTasks));
    setReady((prevTasks) => updateTask(prevTasks));
    setInProgress((prevTasks) => updateTask(prevTasks));
    setFinished((prevTasks) => updateTask(prevTasks));
  };

  const columns: Column[] = [
    { title: "Backlog", tasks: backlog, setTasks: setBacklog, previousTasks: [] },
    { title: "Ready", tasks: ready, setTasks: setReady, previousTasks: backlog },
    { title: "In Progress", tasks: inProgress, setTasks: setInProgress, previousTasks: ready },
    { title: "Finished", tasks: finished, setTasks: setFinished, previousTasks: inProgress },
  ];

  return (
    <main>
      <div className="container">
        <ul className="list-block">
          {columns.map((column) => (
            <ColumnContainer
              key={column.title}
              title={column.title}
              tasks={column.tasks}
              previousTasks={column.previousTasks}
              onAddTask={(task: string) => handleAddTask(column.title, task)}
              onDeleteTask={(taskId: number, columnName: string) =>
                handleDeleteTask(taskId, columnName)
              }
              onUpdateTaskDescription={handleUpdateTaskDescription}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Main;
