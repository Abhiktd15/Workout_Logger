import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Navbar from '../shared/Navbar'
import axios from 'axios'
import {toast} from 'react-toastify'
import { USER_API_END_POINT } from '../../constants'
import { setLoading, setUser } from '../../redux/authSlice'

const Signup = () => {
  const [input,setInput] = useState({
      fullName:"",
      email:"",
      password:"",
      file:""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading} = useSelector(state => state.auth)
  
    const changeEventHandler = (e) => {
      setInput({...input,[e.target.name]: e.target.value})
    }
    const changeFileHandler = (e) => {
      setInput({...input,file: e.target.files[0]})
    }
  
    const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("password",input.password)
    if(input.file){
      formData.append("file",input.file)
    }
      console.log(formData)
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(res.data.success){
        navigate("/")
        dispatch(setUser(res.data.doc))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      dispatch(setLoading(false))
    }
  }
  
  return (
    <div className='h-full'>
      <Navbar/>
      <div className="flex  flex-1 flex-col  justify-center mx-auto items-center px-6 py-12 lg:px-8 text-white  ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
          <h2 className=" text-center text-4xl font-bold tracking-tight ">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full max-sm:max-w-md max-w-lg  ">
          <form onSubmit={submitHandler} className='flex flex-col gap-4'>

            <div>
              <div className="flex items-center justify-between">
                <label  className="block text-lg font-medium ">
                  Full Name
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='text'
                  name='fullName'
                  value={input.fullName}
                  onChange={changeEventHandler}
                  required
                  className="block w-full rounded-md border border-gray-200 bg-[#09090B] px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2   sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label  className="block text-lg font-medium ">
                  Email
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='email'
                  name='email'
                  value={input.email}
                  onChange={changeEventHandler}
                  required
                  className="block w-full rounded-md border border-gray-200 bg-[#09090B] px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2   sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label  className="block text-lg font-medium ">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='password'
                  name='password'
                  value={input.password}
                  onChange={changeEventHandler}
                  required
                  className="block w-full rounded-md border border-gray-200 bg-[#09090B] px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2   sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label  className=" text-lg font-medium ">
                  Profile Image
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='file'
                  accept='image/*'
                  name='file'
                  onChange={changeFileHandler}
                  required
                  className="block w-full rounded-md border border-gray-200 bg-[#09090B] px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2   sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              {
                loading ? <button 
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Loading....</button>:<button
                type="submit"
                className="flex w-full justify-center rounded-md bg-customBlue mt-10 px-3 py-1.5 text-lg font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
              }
              <div className='text-base font-semibold mt-5'>
                <span>Already have an account ?   <Link className='text-blue-600 underline' to='/login' > Log In</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup