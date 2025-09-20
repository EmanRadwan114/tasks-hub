import { X } from "lucide-react";
import { useTasks } from "../../context/TasksContext";
import { useGetTaskByID } from "../../hooks/useTasks";
import { useNavigate, useParams } from "react-router";
import styles from "./TaskModal.module.css";
import { useGetCategoryByID } from "../../hooks/useCategories";
import { useEffect, useState } from "react";
import Button from "./../Button/Button";
import { closeModal } from "../../utils/helperFn";

const displayedData = ["title", "description"];

function TaskDetailsModal() {
  const { setIsModalOpen } = useTasks();
  const { taskId } = useParams();
  const { data: selectedTask } = useGetTaskByID(taskId);
  const { data: taskCategory } = useGetCategoryByID(selectedTask?.category_id);
  const [currentDate, setCurrentDate] = useState(null);
  const taskDate = new Date(selectedTask?.due_date).getTime();

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentDate(new Date().getTime());
  }, []);

  return (
    <section
      className={` ${styles.modal_box}`}
      onClick={() => {
        closeModal(setIsModalOpen, navigate);
      }}
    >
      <div
        className={`modal-content ${styles.modal_content}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* modal header */}
        <header className={`flex-between gap-sm`}>
          <h2 className={`capitalize ${styles.modal_title}`}>Task Details</h2>
          <X
            className={`${styles.close_icon}`}
            cursor="pointer"
            onClick={() => closeModal(setIsModalOpen, navigate)}
          />
        </header>

        {/* task data */}
        <section>
          {/* task image */}
          <div className={`${styles.task_image}`}>
            <img
              src={selectedTask?.image_url}
              alt={selectedTask?.title}
              className={`rounded-sm`}
            />
          </div>
          {/* category */}
          <p
            className={`rounded-md capitalize flex-center gap-sm capitalize fw-bold ${styles.heading} ${styles.category} task_category`}
            style={{ backgroundColor: `${taskCategory?.color}` }}
          >
            <img src={taskCategory?.icon_url} alt={taskCategory?.name} />
            <span>{taskCategory?.name}</span>
          </p>
          <div
            className={`flex-between gap-md field-box ${styles.task_meta_data}`}
          >
            {/* due date */}
            <div className={`flex gap-md w-50 due-date ${styles.due_date}`}>
              <span className={`capitalize ${styles.heading}`}>Due Data:</span>
              <p
                className={`${
                  !selectedTask?.completed && taskDate < currentDate
                    ? "red"
                    : ""
                }`}
              >
                {selectedTask?.due_date}
              </p>
            </div>
            {selectedTask?.completed ? (
              <p className={`capitalize w-50 green fw-bold space`}>Completed</p>
            ) : (
              <p className={`capitalize w-50 red fw-bold space`}>Incomplete</p>
            )}
          </div>
          <div className={`flex-between gap-lg field-box space`}>
            {/* id */}
            <div className={`flex gap-md w-50 ${styles.task_id_view}`}>
              <span className={`capitalize ${styles.heading}`}>ID:</span>
              <p className={`capitalize`}>{selectedTask?.id}</p>
            </div>
            {/* priority */}
            <div className={`flex gap-md w-50 space ${styles.task_priority}`}>
              <span className={`capitalize ${styles.heading}`}>Priority:</span>
              <p
                className={`rounded-md ${
                  selectedTask?.priority === "high"
                    ? "bg-red"
                    : selectedTask?.priority === "medium"
                    ? "bg-orange"
                    : "bg-green"
                }`}
              ></p>
            </div>
          </div>
          {/* title & dec */}
          {displayedData.map((item, indx) => (
            <div key={indx} className={`info-box ${styles.info_box}`}>
              <span className={`capitalize ${styles.heading}`}>{item}:</span>
              <p className={`capitalize ${styles.content}`}>
                {selectedTask?.[`${item}`] || "No Content Found 😞"}
              </p>
            </div>
          ))}
          {/* close modal */}
          <div className="center">
            <Button
              bgColor={"var(--primaryColor)"}
              color={"var(--tertiaryColor)"}
              width={"100%"}
              onClickBtn={() => closeModal(setIsModalOpen, navigate)}
            >
              Close
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default TaskDetailsModal;
