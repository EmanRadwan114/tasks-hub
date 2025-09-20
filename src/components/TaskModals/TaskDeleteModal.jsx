import { useNavigate, useParams } from "react-router";
import { useTasks } from "../../context/TasksContext";
import styles from "./TaskModal.module.css";
import { X } from "lucide-react";
import { closeModal } from "../../utils/helperFn";
import Button from "../Button/Button";
import { useDeleteTask } from "../../hooks/useTasks";

function TaskDeleteModal() {
  const { setIsModalOpen } = useTasks();
  const { taskId } = useParams();

  const { mutate: deleteTask } = useDeleteTask();

  const navigate = useNavigate();

  return (
    <section
      className={`${styles.delete_modal} ${styles.modal_box}`}
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
        <header className={`end`}>
          <X
            className={`${styles.close_icon}`}
            cursor="pointer"
            onClick={() => closeModal(setIsModalOpen, navigate)}
          />
        </header>
        <h2 className={`capitalize center red ${styles.modal_title}`}>
          Are You Sure You Want to Delete This Task?
        </h2>
        {/* close modal */}
        <div className={`flex-center gap-md ${styles.modal_btns}`}>
          <Button
            bgColor={"darkred"}
            color={"var(--tertiaryColor)"}
            border={"2px solid darkred"}
            width={"50%"}
            onClickBtn={() => {
              closeModal(setIsModalOpen, navigate);
              deleteTask({ taskId });
            }}
          >
            Delete
          </Button>
          <Button
            bgColor={"transparent"}
            color={"darkred"}
            border={"2px solid darkred"}
            width={"50%"}
            onClickBtn={() => closeModal(setIsModalOpen, navigate)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TaskDeleteModal;
