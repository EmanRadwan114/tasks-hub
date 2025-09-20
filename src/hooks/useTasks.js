import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as tasksServive from "../services/tasksServices";
import { toast } from "react-toastify";

export const useGetAllTasks = (limit = 12, offset = 0) =>
  useQuery({
    queryKey: ["tasks", limit, offset],
    queryFn: () => tasksServive.getAllTasks(limit, offset),
    placeholderData: keepPreviousData,
  });

export const useGetTasksByCateg = (categId, limit = 12, offset = 0) =>
  useQuery({
    queryKey: ["tasks", categId, limit, offset],
    queryFn: () => tasksServive.getTaskByCateg(categId, limit, offset),
    enabled: !!categId,
    placeholderData: keepPreviousData,
  });

export const useGetTaskByID = (taskId) =>
  useQuery({
    queryKey: ["selectedTask", taskId],
    queryFn: () => tasksServive.getTaskById(taskId),
    enabled: !!taskId,
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newData }) => tasksServive.createTask(newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success(`Task Created Successfully`);
    },
    onError: () => {
      toast.error("Error in Creating The New Task");
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, updatedData }) =>
      tasksServive.updateTaskById(taskId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success(`Task Updated Successfully`);
    },
    onError: () => toast.error("Error in Updating the Task"),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId }) => tasksServive.deleteTaskById(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      toast.success(`Task Deleted Successfully`);
    },
    onError: () => toast.error("Error in Deleting the Task"),
  });
};
