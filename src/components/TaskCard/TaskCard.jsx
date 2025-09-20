import styles from "./TaskCard.module.css";
import {
  EllipsisVertical,
  Eye,
  SquareCheckBig,
  SquarePen,
  Trash2,
} from "lucide-react";
import TaskAction from "../TaskAction/TaskAction";
import { useEffect, useState } from "react";
import { useGetCategoryByID } from "../../hooks/useCategories";
import { Link } from "react-router";
import { useTasks } from "../../context/TasksContext";
import { useUpdateTask } from "../../hooks/useTasks";

// array to create actions btns
const actions = [
  {
    color: "#082569ff",
    icon: <Eye />,
    text: "view",
  },
  {
    color: "rgba(220, 144, 4, 1)",
    icon: <SquarePen />,
    text: "edit",
  },
  {
    color: "darkred",
    icon: <Trash2 />,
    text: "delete",
  },
];

function TaskCard({ task }) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { data: taskCategory } = useGetCategoryByID(task?.category_id);
  const { setIsModalOpen, setTaskAction } = useTasks();
  const { mutate: updateTask } = useUpdateTask();

  const [currentDate, setCurrentDate] = useState(null);
  const taskDate = new Date(task?.due_date).getTime();

  useEffect(() => {
    setCurrentDate(new Date().getTime());
  }, []);

  return (
    <div className={`task-box ${styles.card_container}`}>
      {/* card img */}
      <div className={`relative ${styles.task_img_box}`}>
        <img
          className={`w-100 ${styles.task_img}`}
          src={task?.image_url}
          alt={task?.title}
        />
        {/* task category */}
        <p
          className={`absolute flex-center gap-sm capitalize fw-bold task_category rounded-md`}
          style={{ backgroundColor: `${taskCategory?.color}` }}
        >
          <img src={taskCategory?.icon_url} alt={taskCategory?.name} />
          <span>{taskCategory?.name}</span>
        </p>
      </div>
      <div className={styles.task_body}>
        {/*  priority  */}
        <p className={`flex-between ${styles.task_priority_box}`}>
          <span className="capitalize fw-bold">Priority</span>
          <span
            className={`capitalize center fw-bold w-25 rounded-md ${
              styles.task_priority
            } ${
              task?.priority === "high"
                ? "bg-red"
                : task?.priority === "medium"
                ? "bg-orange"
                : "bg-green"
            }`}
            style={{
              color: `${
                task?.priority === "high"
                  ? "var(--tertiaryColor)"
                  : task?.priority === "medium"
                  ? "var(--textColor)"
                  : "white"
              }`,
            }}
          ></span>
        </p>
        {/* task details */}
        <div className={`flex-between gap-sm ${styles.task_details}`}>
          <h2
            className={`capitalize ${styles.task_title} ${
              task?.completed ? "line-through" : ""
            }`}
          >
            <Link
              to={`/${task?.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => {
                setIsModalOpen((prev) => !prev);
                setTaskAction("view");
              }}
            >
              {task?.title ? `${task?.title}` : "No Title Found 😞"}
            </Link>
          </h2>

          {/* actions menu */}
          <div className={`relative`}>
            <EllipsisVertical
              cursor="pointer"
              color="var(--primaryColor)"
              onClick={() => setIsActionsOpen((previous) => !previous)}
              size={40}
              style={{ padding: "0.5rem" }}
            />
            {/* task actions */}
            {isActionsOpen && (
              <ul
                className={`absolute ${styles.actions_list}`}
              >
                <TaskAction
                  color="green"
                  icon={<SquareCheckBig />}
                  onClickAction={() =>
                    updateTask({
                      taskId: task?.id,
                      updatedData: { completed: !task?.completed },
                    })
                  }
                >
                  {task?.completed ? "uncomplete" : "complete"}
                </TaskAction>

                {actions.map((action, indx) => (
                  <Link
                    to={`/${task?.id}`}
                    style={{ textDecoration: "none" }}
                    key={indx}
                  >
                    <TaskAction
                      color={action.color}
                      icon={action.icon}
                      onClickAction={() => {
                        setIsModalOpen((prev) => !prev);
                        setTaskAction(action.text);
                      }}
                    >
                      {action.text}
                    </TaskAction>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
        <p className={`${task?.completed ? "line-through" : ""}`}>
          {task?.description
            ? `${task?.description.slice(0, 50)}...`
            : "No Description Found 😞"}
        </p>
        {/* due date */}
        {task?.due_date && (
          <p
            className={`${styles.task_due_date}`}
            style={{
              backgroundColor: `${
                !task?.completed && taskDate < currentDate
                  ? "rgba(230, 13, 13, 0.3)"
                  : "lightgray"
              }`,
            }}
          >
            <span className="fw-bold">Due</span> {task?.due_date}
          </p>
        )}
        {/* mark task as completed */}
        {task?.completed ? (
          <p className={`capitalize fw-bold ${styles.completed_txt}`}>
            Completed 🎉
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default TaskCard;
