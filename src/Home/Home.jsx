// import Sidebar from "../Sidebar/Sidebar";
import ThemeToggleButton from "../Components/ThemeToggle";
import Schedule from "../Schedule/Schedule";

const Home = () => {
  return (
    <div>
      {/* <Sidebar/> */}
      <Schedule/>
      <div className=" absolute right-5 top-50 ">
        <ThemeToggleButton/>
      </div>
    </div>
  );
};

export default Home;