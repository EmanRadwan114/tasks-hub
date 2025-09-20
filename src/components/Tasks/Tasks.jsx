import { useTasks } from "../../context/TasksContext";
import TaskCard from "../TaskCard/TaskCard";
import { useCategories } from "./../../context/CategoriesContext";
import { useEffect } from "react";
import { useGetAllTasks, useGetTasksByCateg } from "../../hooks/useTasks";
import styles from "./Tasks.module.css";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Spinner/Spinner";

function Tasks() {
  const { tasks, setTasks, page, setPage } = useTasks();
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
    isPlaceholderData,
    isLoading: filterdTaskIsLoading,
    isFetching: filteredTaskIsFetching,
  } = useGetTasksByCateg(selectedCategory?.id, limit, offset);

  useEffect(() => {
    setTasks(tasks);
  }, [tasks, setTasks]);

  // derived state
  const displayedTasks = selectedCategory?.id
    ? filteredTasksByCateg
    : fetchedTasks;

  return (
    <>
      <section
        className={`relative flex flex-wrap tasks-container ${styles.tasks_container}`}
      >
        {tasksIsLoading ||
        filterdTaskIsLoading ||
        filteredTaskIsFetching ||
        taskIsFetching ? (
          <Spinner />
        ) : (
          <>
            {displayedTasks.length ? (
              <>
                {displayedTasks?.map((task, indx) => (
                  <TaskCard key={indx} task={task} />
                ))}
                <Pagination
                  onHandlePrev={() => {
                    setPage((old) => old - 1);
                  }}
                  onHandleNext={() => {
                    if (
                      !isPlaceholderData &&
                      displayedTasks?.length === limit
                    ) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disablePrev={page === 0}
                  disableNext={
                    isPlaceholderData || displayedTasks?.length < limit
                  }
                />
              </>
            ) : (
              <p className="h-screen">No Tasks Found 😔</p>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default Tasks;
