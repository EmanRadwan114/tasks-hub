import { useQuery } from "@tanstack/react-query";
import * as categoriesService from "../services/categoriesServices";
import { useCategories } from "../context/CategoriesContext";

export const useGetAllCategories = () => {
  const { categories } = useCategories();

  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getAllCategories(),
    enabled: !!categories,
  });
};

export const useGetCategoryByID = (id) =>
  useQuery({
    queryKey: ["category", id],
    queryFn: () => categoriesService.getCategoryByID(id),
    enabled: !!id,
  });
