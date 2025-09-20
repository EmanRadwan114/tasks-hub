import { createContext, useContext, useState } from "react";

const tasksContext = createContext();
function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskAction, setTaskAction] = useState("view");
  const [taskPriority, setTaskPriority] = useState("high");
  const [page, setPage] = useState(0);
  const [filterBy, setFilterBy] = useState("");

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
        filterBy,
        setFilterBy,
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
    filterBy,
    setFilterBy,
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
    filterBy,
    setFilterBy,
  };
};

export default TasksContextProvider;
