import PropTypes from "prop-types";
import ThemeToggleButton from "../Components/ThemeToggle";
import defaultUserPhoto from '../assets/user photo default.jpg';


const TeacherNavbar = (props) => {

    

    return(
        <div style={{borderLeft:" 1px solid #ffffff14"}}className="TEACHER_NAVBAR flex flex-row justify-between items-center w-full h-[60px] bg-[#0369a1] dark:bg-[#1C2434] px-10">

            {/* Teacher information display */}
            <div className=" w-max h-full relative flex flex-row gap-3 items-center ">
                <div className=" relative flex rounded-full my-2 w-[45px] h-[45px] bg-slate-400 overflow-clip">
                    <img src={props.img? props.img : defaultUserPhoto} alt="profile pic" height={'45px'} 
                    className=" relative m-auto"/>
                </div>
                <div>
                    <h4 className=" text-[20px] text-white font-semibold">{`${props.name}`}</h4>
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
    img: PropTypes.img
  };

export default TeacherNavbar;