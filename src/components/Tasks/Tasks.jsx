import { useTasks } from "../../context/TasksContext";
import TaskCard from "../TaskCard/TaskCard";
import { useCategories } from "./../../context/CategoriesContext";
import { useEffect } from "react";
import { useGetAllTasks, useGetTasksByCateg } from "../../hooks/useTasks";
import styles from "./Tasks.module.css";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Spinner/Spinner";

function Tasks() {
  const { setTasks, page, setPage } = useTasks();
  const { selectedCategory } = useCategories();
  const limit = 12;
  const offset = limit * page;

  const {
    data: fetchedTasks,
    isLoading: tasksIsLoading,
    isFetching: taskIsFetching,
  } = useGetAllTasks(12, offset);

  const {
    data: filteredTasksByCateg,
    isLoading: filterdTaskIsLoading,
    isFetching: filteredTaskIsFetching,
  } = useGetTasksByCateg(selectedCategory?.id, limit, offset);

  // derived state
  const displayedTasks = selectedCategory ? filteredTasksByCateg : fetchedTasks;

  useEffect(() => {
    setTasks(displayedTasks);
  }, [displayedTasks, setTasks]);

  return (
    <>
      <section
        className={`relative flex flex-wrap tasks-container ${styles.tasks_container}`}
        style={{ minHeight: "50vh" }}
      >
        {tasksIsLoading ||
        filterdTaskIsLoading ||
        filteredTaskIsFetching ||
        taskIsFetching ? (
          <Spinner />
        ) : displayedTasks.length ? (
          <>
            {displayedTasks?.map((task, indx) => (
              <TaskCard key={indx} task={task} />
            ))}
          </>
        ) : (
          <div className="flex-center w-100">
            <p
              className="capitalize center fw-bold"
              style={{ fontSize: "1.5rem" }}
            >
              No Tasks Found 😞
            </p>
          </div>
        )}
        <Pagination
          onHandlePrev={() => {
            setPage((old) => old - 1);
          }}
          onHandleNext={() => {
            setPage((old) => old + 1);
          }}
          disablePrev={page === 0}
          disableNext={displayedTasks?.length < limit}
        />
      </section>
    </>
  );
}

export default Tasks;
