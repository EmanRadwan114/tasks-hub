import axiosAPI from "./../utils/ApiUrl";

const getAllCategories = async () => {
  const categories = await axiosAPI.get("/categories?order=name.asc");
  console.log(categories);

  return categories?.data;
};

const getCategoryByID = async (id) => {
  const category = await axiosAPI.get(`/categories?id=eq.${id}`);
  return category?.data[0];
};

export { getAllCategories, getCategoryByID };
