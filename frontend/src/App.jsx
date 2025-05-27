import axios from "axios"
import { useEffect } from "react"
import './App.css'
import { useDispatch } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/HomePage/Home"
import ProtectedRoute from "./components/ProtectedRoutes"
import WorkoutDetails from "./components/WorkoutPage/WorkoutDetails"
import Workouts from "./components/WorkoutPage/Workouts"
import { USER_API_END_POINT } from "./constants"
import {  setUser } from "./redux/authSlice"
import { useState } from "react"

const route = createBrowserRouter([  
  {
    path:"/",
    element:<ProtectedRoute>
      <Home/>
    </ProtectedRoute>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/workout",
    element:<ProtectedRoute>
      <Workouts/>
    </ProtectedRoute>
  },
  {
    path:"/workout/:workoutId",
    element:<ProtectedRoute>
      <WorkoutDetails/>
    </ProtectedRoute>
  },
])

function App() {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`,{withCredentials:true})
        if (res.data.success) {
          dispatch(setUser(res.data.user))      
        }
      } catch (error) {
        console.log(error)
        toast.error("Please Login to continue")
      }finally{
        setLoading(false)
      }
    }
    isAuthorized()
  },[dispatch])

  if (loading) {
    return <div className="text-white h-screen bg-black text-center p-10">Loading...</div>;
  }

  return (
    <div className="bg-[#161616] min-h-screen text-white ">
      <RouterProvider router={route}/>
      <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </div>
  )
}

export default App
