import PropTypes from "prop-types";
import ThemeToggleButton from "../Components/ThemeToggle";


const TeacherNavbar = (props) => {

    

    return(
        <div className="TEACHER_NAVBAR flex flex-row justify-between items-center w-full h-30 bg-[#0369a1] px-10">

            {/* Teacher information display */}
            <div className=" w-max h-full relative flex flex-row gap-7 items-center ">
                <div className=" relative flex justify-center rounded-full w-[80px] h-[80px] bg-slate-400 overflow-clip">
                    <img src="" alt="profile pic" height={'80px'} 
                    className=" relative m-auto"/>
                </div>
                <div>
                    <h4 className=" text-[20px] text-white font-semibold">{`${props.name}`}</h4>
                    {/* <span className=" text-[14px] text-slate-200 font-regular"> M.Tech IT 8th Sem</span> */}
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