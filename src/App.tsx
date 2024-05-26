import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  const [activeTasks, setActiveTasks] = useState(0);
  const [finishedTasks, setFinishedTasks] = useState<number>(0);

  const updateTaskCounts = () => {
    const finishedLength: number = JSON.parse(localStorage.getItem("Finished") || "[]").length;

    const activeColumns = ["Backlog", "Ready", "InProgress"];
    const activeCount = activeColumns.reduce((total, column) => {
      return total + JSON.parse(localStorage.getItem(column) || "[]").length;
    }, 0);

    setActiveTasks(activeCount);
    setFinishedTasks(finishedLength);
  };

  useEffect(() => {
    updateTaskCounts();
  }, []);

  return (
    <div className="Wrapper">
      <Header />
      <Main updateTaskCounts={updateTaskCounts} />
      <Footer activeTasks={activeTasks} finishedTasks={finishedTasks} />
    </div>
  );
}

export default App;
