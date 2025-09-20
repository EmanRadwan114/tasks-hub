import { X } from "lucide-react";
import { useTasks } from "../../context/TasksContext";
import {
  useCreateTask,
  useGetTaskByID,
  useUpdateTask,
} from "../../hooks/useTasks";
import { useNavigate, useParams } from "react-router";
import styles from "./TaskModal.module.css";
import { closeModal } from "../../utils/helperFn";
import DropDownBox from "../DropDownMenu/DropDownBox";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useCategories } from "../../context/CategoriesContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../Spinner/Spinner";

function TaskEditModal() {
  const { taskId } = useParams();
  const { setIsModalOpen, taskAction, setTaskPriority, taskPriority } =
    useTasks();
  const { categories, setTaskCategory, taskCategory } = useCategories();
  const { data: selectedTask, isLoading } = useGetTaskByID(taskId);
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: createTask } = useCreateTask();

  const [formInitialValues, setFormInitialValues] = useState({
    title: "",
    description: "",
    image_url: "https://picsum.photos/400/300?random=3649",
    priority: "",
    category_id: categories.length,
    due_date: "",
    completed: false,
  });

  const navigate = useNavigate();

  const taskCateg = categories?.find(
    (categ) => categ.id === selectedTask?.category_id
  );

  useEffect(() => {
    setTaskPriority(selectedTask?.priority);
    setTaskCategory(taskCateg?.name);
  }, [selectedTask, setTaskPriority, taskCateg, setTaskCategory]);

  useEffect(() => {
    setFormInitialValues({
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      image_url:
        selectedTask?.image_url || "https://picsum.photos/400/300?random=3649",
      priority: selectedTask?.priority || "high",
      category_id: selectedTask?.category_id || 25,
      due_date: selectedTask?.due_date || "",
      completed: selectedTask?.completed || false,
    });
  }, [selectedTask, taskCateg, categories]);

  // form validation & schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title should be at least 3 characters")
      .max(255, "Title should not exceed 255 characters")
      .required("Title is Required"),
    description: Yup.string()
      .min(3, "Description should be at least 3 characters")
      .max(255, "Image URL should not exceed 500 characters")
      .notRequired(),
    image_url: Yup.string()
      .min(3, "Description should be at least 3 characters")
      .notRequired(),
    priority: Yup.string()
      .oneOf(
        ["high", "medium", "low"],
        "Priority can only be high, medium or low"
      )
      .default("high")
      .required("Priority is Required"),
    category_id: Yup.string().required("Category ID is Required"),
    due_date: Yup.date()
      .typeError("Must be a valid Date YYYY-M-DD")
      .required("Due Date is Required"),
    completed: Yup.boolean().default(false).notRequired(),
  });

  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      values.category_id = categories.find(
        (categ) => categ.name === taskCategory
      ).id;

      if (taskAction === "edit") {
        updateTask({ taskId, updatedData: values });
      } else if (taskAction === "add") {
        createTask({ newData: values });
      }

      if (formik.touched && formik.isValid) {
        closeModal(setIsModalOpen, navigate);
      }
    },
  });

  return (
    <section
      className={`fixed ${styles.modal_box}`}
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
          <h2 className={`capitalize ${styles.modal_title}`}>
            {taskAction === "add"
              ? "Create a New Task"
              : taskAction === "edit"
              ? "Edit Task"
              : ""}
          </h2>
          <X
            className={`${styles.close_icon}`}
            cursor="pointer"
            onClick={() => closeModal(setIsModalOpen, navigate)}
          />
        </header>

        {/* task data */}
        {isLoading ? (
          <section className="flex-center h-screen">
            <Spinner />;
          </section>
        ) : (
          <section>
            <form onSubmit={formik.handleSubmit}>
              {/* task id */}
              {taskAction === "edit" && (
                <div
                  className={`flex items-center gap-lg ${styles.field_box} ${styles.task_id}`}
                >
                  <label
                    htmlFor="task-id"
                    className={`capitalize ${styles.heading}`}
                  >
                    Task ID:
                  </label>
                  <span className={`capitalize ${styles.content}`} id="task-id">
                    {selectedTask?.id}
                  </span>
                </div>
              )}
              {/* priority */}
              <div className={`flex items-center gap-lg ${styles.field_box}`}>
                <span className={`capitalize ${styles.heading}`}>
                  Priority:
                </span>
                <DropDownBox
                  border={"1px solid var(--primaryColor)"}
                  options={[
                    { id: 1, name: "high", color: "darkred" },
                    { id: 2, name: "medium", color: "orange" },
                    { id: 3, name: "low", color: "darkgreen" },
                  ]}
                  selectedItem={taskPriority}
                  setSelectedItem={setTaskPriority}
                  formik={formik}
                  name="priority"
                />
              </div>
              {(formik.touched.priority || formik.values.priority !== "") &&
              formik.errors.priority ? (
                <p className={`red fw-bold ${styles.error_txt}`}>
                  {formik.errors.priority}
                </p>
              ) : null}
              {/* category */}
              <div className={`flex flex-column gap-sm ${styles.field_box}`}>
                <span className={`capitalize ${styles.heading}`}>
                  Category:
                </span>
                <DropDownBox
                  border={"1px solid var(--primaryColor)"}
                  options={categories}
                  selectedItem={taskCategory}
                  setSelectedItem={setTaskCategory}
                  formik={formik}
                  name="category_id"
                />
              </div>
              {formik.touched.category_id && formik.errors.category_id ? (
                <p className={`red fw-bold ${styles.error_txt}`}>
                  {formik.errors.category_id}
                </p>
              ) : null}

              {/* task title */}
              <div className={`flex flex-column ${styles.field_box}`}>
                <label
                  htmlFor="task-title"
                  className={`capitalize ${styles.heading}`}
                >
                  Title:
                </label>
                <input
                  type="text"
                  className={`capitalize ${styles.content}`}
                  id="task-title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {(formik.touched.title || formik.values.title !== "") &&
              formik.errors.title ? (
                <p className={`red fw-bold ${styles.error_txt}`}>
                  {formik.errors.title}
                </p>
              ) : null}
              {/* task description */}
              <div className={`flex flex-column ${styles.field_box}`}>
                <label
                  htmlFor={`task-description`}
                  className={`capitalize ${styles.heading}`}
                >
                  Description:
                </label>
                <textarea
                  id="task-description"
                  className={`capitalize ${styles.content} ${styles.task_desc}`}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {(formik.touched.description ||
                formik.values.description !== "") &&
              formik.errors.description ? (
                <p className={`red fw-bold ${styles.error_txt}`}>
                  {formik.errors.description}
                </p>
              ) : null}

              {/* task image url */}
              <div className={`flex flex-column ${styles.field_box}`}>
                <label
                  htmlFor="task-image-url"
                  className={`capitalize ${styles.heading}`}
                >
                  Image URL:
                </label>
                <div
                  className={`flex items-center gap-md ${styles.task_img_box}`}
                >
                  <input
                    type="text"
                    className={`capitalize w-75 ${styles.content}`}
                    id="task-image-url"
                    name="image_url"
                    value={formik.values.image_url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <img
                    src={formik.values.image_url || null}
                    alt={formik.values.title}
                    className="rounded-sm"
                  />
                </div>
              </div>
              {(formik.touched.image_url || formik.values.image_url !== "") &&
              formik.errors.image_url ? (
                <p className={`red fw-bold ${styles.error_txt}`}>
                  {formik.errors.image_url}
                </p>
              ) : null}

              {/* task due date */}
              <div
                className={`flex items-center gap-lg field-box ${styles.field_box}`}
              >
                <label
                  htmlFor="task-due"
                  className={`capitalize ${styles.heading}`}
                >
                  Due Date:
                </label>
                <input
                  type="date"
                  className={`capitalize ${styles.content}`}
                  id="task-due"
                  name="due_date"
                  value={formik.values.due_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {(formik.touched.due_date || formik.values.due_date !== "") &&
              formik.errors.due_date ? (
                <p className={`red fw-bold ${styles.error_txt}`}>
                  {formik.errors.due_date}
                </p>
              ) : null}
              {/* close modal */}
              <div
                className={`flex-center gap-md modal-btns ${styles.modal_btns}`}
              >
                <Button
                  bgColor={"var(--primaryColor)"}
                  color={"var(--tertiaryColor)"}
                  border={"2px solid var(--primaryColor)"}
                  width={"50%"}
                  type="submit"
                >
                  {taskAction === "add"
                    ? "Create Task"
                    : taskAction === "edit"
                    ? "Edit Task"
                    : ""}
                </Button>
                <Button
                  bgColor={"transparent"}
                  color={"var(--primaryColor)"}
                  border={"2px solid var(--primaryColor)"}
                  width={"50%"}
                  onClickBtn={() => closeModal(setIsModalOpen, navigate)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </section>
        )}
      </div>
    </section>
  );
}

export default TaskEditModal;
