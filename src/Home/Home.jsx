import Sidebar from "../Sidebar/Sidebar";
import ThemeToggleButton from "../Components/ThemeToggle";

const Home = () => {
  return (
    <div>
      <Sidebar/>
      <div className=" absolute right-5 top-50 ">
        <ThemeToggleButton/>
      </div>
    </div>
  );
};

export default Home;
