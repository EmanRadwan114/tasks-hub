import { useCategories } from "../../context/CategoriesContext";
import styles from "./Filter.module.css";
import FilterOption from "./FilterOption";

function FilterMenu({ onSetIsFilterMenuOpen }) {
  const { categories, setSelectedCategory } = useCategories();

  return (
    <ul className={`absolute ${styles.filter_list}`}>
      <FilterOption
        bgColor="#45043eff"
        onClickAction={() => {
          setSelectedCategory(null);
          onSetIsFilterMenuOpen(false);
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
