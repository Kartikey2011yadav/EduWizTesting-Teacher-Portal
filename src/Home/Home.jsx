import SideBar from "../SideBar/SideBar";
import ThemeToggleButton from "../Components/ThemeToggle";

const Home = () => {
  return (
    <div>
      <SideBar/>
      <div className=" absolute right-5 top-3 ">
        <ThemeToggleButton/>
      </div>
    </div>
  );
};

export default Home;
