import Button from "../Button/Button";
import styles from "./TasksControls.module.css";
import { useTasks } from "../../context/TasksContext";
import FilterByCategory from "../FilterByCategory/FilterByCategory";

function TasksControls() {
  const { setTaskAction, setIsModalOpen } = useTasks();
  return (
    <div
      className={`flex-between items-start controls-container ${styles.controls_container}`}
    >
      <FilterByCategory />

      <Button
        bgColor="var(--primaryColor)"
        color="var(--tertiaryColor)"
        onClickBtn={() => {
          setTaskAction("add");
          setIsModalOpen(true);
        }}
      >
        + Add Task
      </Button>
    </div>
  );
}

export default TasksControls;
