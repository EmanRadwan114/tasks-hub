export const closeModal = (onCloseModal, navigate) => {
  onCloseModal((prev) => !prev);
  navigate("/");
};
