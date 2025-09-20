import { useEffect } from "react";
import { Outlet } from "react-router";
import { useTasks } from "../../context/TasksContext";
import { useCategories } from "../../context/CategoriesContext";
import { useGetAllCategories } from "../../hooks/useCategories";
import TaskDetailsModal from "../TaskModals/TaskDetailsModal";
import TaskFormModal from "../TaskModals/TaskFormModal";
import TaskDeleteModal from "../TaskModals/TaskDeleteModal";
import Spinner from "../Spinner/Spinner";

function Layout() {
  const { setCategories, setTaskCategory } = useCategories();
  const { setTasks, isModalOpen, taskAction, setTaskPriority } = useTasks();

  // fetch categories
  const { data: categories = [], isLoading: categIsLoading } =
    useGetAllCategories();

  useEffect(() => {
    setCategories(categories);
  }, [categories, setCategories, setTasks]);

  useEffect(() => {
    setTaskPriority("high");
    setTaskCategory(categories[0]?.name);

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isModalOpen, categories, setTaskCategory, setTaskPriority]);

  // early return
  if (categIsLoading)
    return (
      <section className="flex-center h-screen">
        <Spinner />;
      </section>
    );

  return (
    <>
      <Outlet />
      {isModalOpen && taskAction === "view" ? (
        <TaskDetailsModal />
      ) : isModalOpen && taskAction === "edit" ? (
        <TaskFormModal />
      ) : isModalOpen && taskAction === "delete" ? (
        <TaskDeleteModal />
      ) : isModalOpen && taskAction === "add" ? (
        <TaskFormModal />
      ) : null}
    </>
  );
}

export default Layout;
