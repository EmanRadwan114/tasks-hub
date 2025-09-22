import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./DropDown.module.css";
import DropDownMenu from "./DropDownMenu";

function DropDownBox({
  border,
  options,
  selectedItem,
  setSelectedItem,
  formik,
  name,
}) {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  return (
    <div className="relative cursor-pointer">
      <div
        className={`rounded-sm flex-between ${styles.filter_box}`}
        style={{ border }}
        onClick={() => setIsFilterMenuOpen((prev) => !prev)}
      >
        <p className="capitalize">
          {name === "category_id" && formik.values[name]
            ? selectedItem
            : name === "priority" && formik.values[name]
            ? formik.values[name]
            : "Choose Item"}
        </p>
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
        <DropDownMenu
          onClickAction={() => setIsFilterMenuOpen(false)}
          options={options}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          formik={formik}
          name={name}
        />
      )}
    </div>
  );
}

export default DropDownBox;
