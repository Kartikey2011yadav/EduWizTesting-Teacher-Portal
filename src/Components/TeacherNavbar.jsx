import PropTypes from "prop-types";
import ThemeToggleButton from "../Components/ThemeToggle";


const TeacherNavbar = (props) => {

    

    return(
        <div className="TEACHER_NAVBAR flex flex-row justify-between items-center w-full h-[90px] bg-[#0369a1] px-10">

            {/* Teacher information display */}
            <div className=" w-max h-full relative flex flex-row gap-5 items-center ">
                <div className=" relative flex rounded-full my-2 w-[70px] h-[70px] bg-slate-400 overflow-clip">
                    <img src="" alt="profile pic" height={'70px'} 
                    className=" relative m-auto"/>
                </div>
                <div>
                    <h4 className=" text-[24px] text-white font-semibold">{`${props.name}`}</h4>
                    {/* <span className=" text-[14px] text-slate-200 font-regular"> M.Tech IT 7th Sem</span> */}
                </div>
            </div>




            {/* dark mode button  */}
            <div className=" relative  ">
                <ThemeToggleButton/>
            </div>
        </div>
    )
}

TeacherNavbar.propTypes = {
    name: PropTypes.string.isRequired,
  };

export default TeacherNavbar;