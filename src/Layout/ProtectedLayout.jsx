import { Outlet } from 'react-router-dom';
import logo from '../assets/user photo default.jpg';
import Sidebar from '../Sidebar/Sidebar';
import TeacherNavbar from '../Navbar/TeacherNavbar';

const ProtectedLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TeacherNavbar name={localStorage.getItem('name')} img={logo} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>   
    </div>









  );
};

export default ProtectedLayout;
