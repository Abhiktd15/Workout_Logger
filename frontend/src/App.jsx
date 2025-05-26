import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import { ToastContainer } from "react-toastify"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"

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
])

function App() {

  return (
    <div className="bg-background ">
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
