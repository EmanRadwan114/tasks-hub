import Header from "./../Header/Header";
import TasksControls from "./../TasksControls/TasksControls";
import Tasks from "./../Tasks/Tasks";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* <TaskDetails /> */}
      <Header />
      <main className="container">
        <TasksControls />
        <Tasks />
      </main>
      <Footer />
    </section>
  );
}

export default Home;
