import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'


const Reset = () => {
  return (
    <div className='m-0  w-screen h-screen flex justify-center items-center bg-[#F3F4F6] text-black dark:bg-[#010B18] dark:text-white' >
     
      <div className='m-auto rounded-lg w-[40%] h-[78%] flex flex-col  justify-start items-center bg-[#FFFFFF]  text-black dark:bg-[#1F2937] dark:text-white'>
        <div className='flex-col mt-6 px-10 w-full h-fit flex justify-start items-center'>
            <img src={logo} alt="logo" className='w-[60px] h-[60px]  ' />
          <h1 className="mt-4 text-3xl justify-center">Reset Password</h1>
          <h1 className="text-lg justify-center mt-2 text-gray-600 font-bold">Enter Your Password and Confirm Password</h1>
          <div className='flex flex-col mt-10 w-full gap-4 text-lg'><h1>Password:</h1>
          <input placeholder='Enter Your Password' className='bg-transparent px-4 border-2 w-full border-none bg-gray-500 h-[50px] rounded-lg'></input></div>
          <div className='flex flex-col mt-6 w-full  gap-4 text-lg'><h1>Confirm Password:</h1>
          <input placeholder='Confirm Your Password' className='bg-transparent px-4 border-2 w-full h-[50px] border-none bg-gray-500 rounded-md'></input></div>
          <button className='mt-10 w-full h-[50px] bg-blue-500 text-white rounded-lg'>Reset Password</button>
          <div className='flex flex-row gap-1 items-center justify-center mt-4 w-full gap-4 text-lg'><h1>Remember Password?</h1>
          <Link to='/' className=' text-blue-500'>Back to Login</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Reset
