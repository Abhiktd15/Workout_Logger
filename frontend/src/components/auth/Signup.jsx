import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'

const Signup = () => {
  const [input,setInput] = useState({
      fullName:"",
      email:"",
      password:"",
      role:"",
      file:""
    })
    // const navigate = useNavigate()
    // const dispatch = useDispatch()

    // const {loading} = useSelector(state => state.auth)
    const [loading,setLoading] = useState(false)
  
    const changeEventHandler = (e) => {
      setInput({...input,[e.target.name]: e.target.value})
    }
  
//     const submitHandler = async (e) => {
//     e.preventDefault();
    
//     try {
//       dispatch(setLoading(true))
//       const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
//         headers:{
//           "Content-Type":"application/json"
//         },
//         withCredentials:true
//       })
//       if(res.data.success){
//         dispatch(setUser(res.data.user))
//         navigate('/')
//         toast.success(res.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.response.data.message)
//     }finally{
//       dispatch(setLoading(false))
//     }
//   }
  
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
          <form  className='flex flex-col gap-4'>

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
                  value={input.file}
                  onChange={changeEventHandler}
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
                Log In
              </button>
              }
              <div className='text-base font-semibold mt-5'>
                <span>Already have an account ?   <Link className='text-blue-600 underline' to='/signup' > Sign up</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup