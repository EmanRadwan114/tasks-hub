import axiosAPI from "../utils/ApiUrl";

const getAllTasks = async (limit = 12, offset = 0) => {
  const tasks = await axiosAPI.get(
    `/tasks?order=created_at.desc&limit=${limit}&offset=${offset}`
  );
  return tasks.data;
};

const getTaskByCateg = async (categId, limit = 12, offset = 0) => {
  const tasks = await axiosAPI.get(
    `/tasks?category_id=eq.${categId}&limit=${limit}&offset=${offset}`
  );
  return tasks.data;
};

const getTaskById = async (taskId) => {
  const selectedTask = await axiosAPI.get(`/tasks?id=eq.${taskId}`);
  return selectedTask.data[0];
};

export const createTask = async (newData) => {
  const createdTask = await axiosAPI.post(`/tasks`, newData);
  console.log(createdTask);
  return createdTask?.data[0];
};

const updateTaskById = async (taskId, updatedData) => {
  const updatedTask = await axiosAPI.patch(
    `/tasks?id=eq.${taskId}`,
    updatedData
  );
  return updatedTask?.data[0];
};

const deleteTaskById = async (taskId) => {
  const deletedTask = await axiosAPI.delete(`/tasks?id=eq.${taskId}`);
  return deletedTask?.data[0];
};

export {
  getAllTasks,
  getTaskByCateg,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
