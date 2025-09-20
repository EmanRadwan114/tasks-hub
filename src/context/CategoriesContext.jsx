import { createContext, useContext, useState } from "react";

const categoriesContext = createContext();

function CategoriesContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [taskCategory, setTaskCategory] = useState("");

  return (
    <categoriesContext.Provider
      value={{
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        taskCategory,
        setTaskCategory,
      }}
    >
      {children}
    </categoriesContext.Provider>
  );
}

export const useCategories = () => {
  const {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    taskCategory,
    setTaskCategory,
  } = useContext(categoriesContext);
  return {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    taskCategory,
    setTaskCategory,
  };
};

export default CategoriesContextProvider;
