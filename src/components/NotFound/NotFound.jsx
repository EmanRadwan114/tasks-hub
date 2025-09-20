import { Link } from "react-router";
import img from "../../assets/not-found.png";
import Button from "../Button/Button";

function NotFound() {
  return (
    <main style={style.container} className="flex-center">
      <div className="w-100 flex-center flex-column">
        <p style={style.txt} className="fw-bold">
          Page Not Found
        </p>
        <img
          src={img}
          alt="not found 404 error"
          style={style.img}
          className="rounded-md"
        />
        <Link to={"/"}>
          <Button
            bgColor={"var(--primaryColor)"}
            color={"var(--tertiaryColor)"}
          >
            Back To Home
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;

const style = {
  container: { minHeight: "100vh" },
  img: {
    width: "40%",
  },
  txt: { fontSize: "1.8rem" },
};
