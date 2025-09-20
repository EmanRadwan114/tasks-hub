import Header from "./../Header/Header";
import TasksControls from "./../TasksControls/TasksControls";
import Tasks from "./../Tasks/Tasks";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <section className="container">
        <TasksControls />
        <Tasks />
      </section>
      <Footer />
    </main>
  );
}

export default Home;
