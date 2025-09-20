import { createContext, useContext, useState } from "react";

const tasksContext = createContext();
function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskAction, setTaskAction] = useState("view");
  const [taskPriority, setTaskPriority] = useState("high");
  const [page, setPage] = useState(0);

  return (
    <tasksContext.Provider
      value={{
        tasks,
        setTasks,
        isModalOpen,
        setIsModalOpen,
        taskAction,
        setTaskAction,
        taskPriority,
        setTaskPriority,
        page,
        setPage,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
}

export const useTasks = () => {
  const {
    tasks,
    setTasks,
    isModalOpen,
    setIsModalOpen,
    taskAction,
    setTaskAction,
    taskPriority,
    setTaskPriority,
    page,
    setPage,
  } = useContext(tasksContext);
  return {
    tasks,
    setTasks,
    isModalOpen,
    setIsModalOpen,
    taskAction,
    setTaskAction,
    taskPriority,
    setTaskPriority,
    page,
    setPage,
  };
};

export default TasksContextProvider;
