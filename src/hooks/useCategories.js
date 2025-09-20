import { useQuery } from "@tanstack/react-query";
import * as categoriesService from "../services/categoriesServices";

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getAllCategories(),
  });

export const useGetCategoryByID = (id) =>
  useQuery({
    queryKey: ["category", id],
    queryFn: () => categoriesService.getCategoryByID(id),
    enabled: !!id,
  });
