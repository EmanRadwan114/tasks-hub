import styles from "./DropDown.module.css";
import DropDownItem from "./DropDownItem";

function DropDownMenu({
  options,
  onClickAction,
  setSelectedItem,
  formik,
  name,
}) {
  return (
    <ul className={`absolute ${styles.filter_list}`}>
      {options?.map((option) => (
        <DropDownItem
          key={option?.id}
          option={option}
          onClickAction={() => {
            formik.setFieldValue(name, option?.name);
            onClickAction();
          }}
          selectedItem={formik.values[name]}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </ul>
  );
}

export default DropDownMenu;
