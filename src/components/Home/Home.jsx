import Header from "./../Header/Header";
import TasksControls from "./../TasksControls/TasksControls";
import Tasks from "./../Tasks/Tasks";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <main>
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
