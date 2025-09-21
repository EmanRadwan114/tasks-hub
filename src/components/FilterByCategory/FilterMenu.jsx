import { useQueryClient } from "@tanstack/react-query";
import { useCategories } from "../../context/CategoriesContext";
import { useTasks } from "../../context/TasksContext";
import styles from "./Filter.module.css";
import FilterOption from "./FilterOption";

function FilterMenu({ onSetIsFilterMenuOpen }) {
  const { categories, setSelectedCategory } = useCategories();
  const { setPage } = useTasks();
  const queryClient = useQueryClient();

  return (
    <ul className={`absolute ${styles.filter_list}`}>
      <FilterOption
        bgColor="#45043eff"
        onClickAction={() => {
          setSelectedCategory(null);
          onSetIsFilterMenuOpen(false);
          queryClient.invalidateQueries(["tasks"]);
          setPage(0);
        }}
      >
        All Categories
      </FilterOption>
      {categories?.map((category) => (
        <FilterOption
          key={category?.id}
          bgColor={`${category?.color}`}
          onClickAction={() => {
            setSelectedCategory(category);
            onSetIsFilterMenuOpen(false);
            setPage(0);
          }}
        >
          <img src={category?.icon_url} alt={category.name} />
          {category?.name}
        </FilterOption>
      ))}
    </ul>
  );
}

export default FilterMenu;
