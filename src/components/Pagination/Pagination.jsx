import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

function Pagination({ onHandlePrev, onHandleNext, disablePrev, disableNext }) {
  return (
    <section className={`flex-center w-100`}>
      <button
        onClick={onHandlePrev}
        className={`flex-center ${styles.btn}`}
        disabled={disablePrev}
      >
        <ChevronLeft />
        <span>Prev</span>
      </button>
      <button
        onClick={onHandleNext}
        className={`flex-center ${styles.btn}`}
        disabled={disableNext}
      >
        <span>Next</span>
        <ChevronRight />
      </button>
    </section>
  );
}

export default Pagination;
