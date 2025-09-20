import { useCategories } from "../../context/CategoriesContext";
import styles from "./Filter.module.css";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import FilterMenu from "./FilterMenu";

function FilterByCategory() {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const { selectedCategory } = useCategories();

  return (
    <div className="relative cursor-pointer">
      <div
        className={`filter-box flex-between ${styles.filter_box}`}
        onClick={() => setIsFilterMenuOpen((prev) => !prev)}
      >
        <div>
          {selectedCategory?.name ? (
            <div className="flex-center gap-sm">
              <div className={`${styles.categ_icon} rounded-md`}>
                <img
                  src={selectedCategory?.icon_url}
                  alt={selectedCategory?.name}
                />
              </div>
              <span>{selectedCategory?.name}</span>
            </div>
          ) : (
            <p>-- Filter By Category --</p>
          )}
        </div>
        <span>
          {isFilterMenuOpen ? (
            <ChevronUp color="var(--textColor)" style={{ padding: "0.2rem" }} />
          ) : (
            <ChevronDown
              color="var(--textColor)"
              style={{ padding: "0.2rem" }}
            />
          )}
        </span>
      </div>
      {isFilterMenuOpen && (
        <FilterMenu onSetIsFilterMenuOpen={setIsFilterMenuOpen} />
      )}
    </div>
  );
}

export default FilterByCategory;
