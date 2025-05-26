import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/HomePage/Home"
import Workouts from "./components/WorkoutPage/Workouts"
import WorkoutDetails from "./components/WorkoutPage/WorkoutDetails"

const route = createBrowserRouter([  
  {
    path:"/",
    element:<Home/>
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
    element:<Workouts/>
  },
  {
    path:"/workout/:workoutId",
    element:<WorkoutDetails/>
  },
])

function App() {

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
