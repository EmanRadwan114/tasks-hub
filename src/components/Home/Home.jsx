import Header from "./../Header/Header";
import TasksControls from "./../TasksControls/TasksControls";
import Tasks from "./../Tasks/Tasks";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <>
      {/* <TaskDetails /> */}
      <Header />
      <main className="container">
        <TasksControls />
        <Tasks />
      </main>
      <Footer />
    </>
  );
}

export default Home;
