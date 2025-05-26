import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from "@headlessui/react";
import { ArrowRightStartOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";

const Navbar = () => {
    // const dispatch = useDispatch();
    // const navigate  = useNavigate();

    // const logoutHandler = async() => {
    //     try {
    //         const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials: true,})
    //         if(res.data.success){
    //             dispatch(setUser(null))
    //             navigate("/")
    //             toast.success(res.data.message)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response.data.message)
    //     }
    // }
    const user = false

    return (
        <div className="">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                <h1 className="text-2xl font-bold text-white">
                    Workout<span className="text-customBlue">Tracker</span>
                </h1>
                </div>
                <div className="flex items-center gap-10">
                <ul className="flex font-bold items-center gap-5 ">
                        <>
                            <Link to='/' className="text-white   border border-gray-500 px-2 rounded-lg py-1 hover:scale-105  " >Home</Link>
                            <Link to='/workout' className="text-white   border border-gray-500 px-2 rounded-lg py-1 hover:scale-105 ">Workout Routines</Link>
                        </>
                </ul>

                {
                    !user ? (
                        <div className=" flex items-center gap-2">
                            <Link to={'/login'}><Button className='border font-semibold rounded-lg border-gray-500 px-3 text-white py-2 hover:scale-105'>Login</Button></Link>
                            <Link to={'/signup'}><Button className='border font-semibold rounded-lg text-white px-3 py-2 bg-customBlue hover:scale-105 hover:bg-blue-700'>Sign Up</Button></Link>
                        </div>
                    ):(
                        <div className="text-black">
                            {/* Avatar Dropdown Menu  */}
                            <Menu as="div" className="relative ml-3 ">
                                <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                    alt="Profile Icon"
                                    src=""
                                    className="size-10 rounded-full"
                                    />
                                </MenuButton>
                                </div>
                                <MenuItems
                                transition
                                className="absolute right-0 space-y-4 z-10 mt-2 w-80 origin-top-right rounded-md bg-white p-5 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                <MenuItem>
                                    <div className="flex items-center gap-4 ">
                                        <img
                                            alt="Profile Photo"
                                            src=""
                                            className="size-10 rounded-full"
                                            />
                                        <div>
                                            <h4 className="font-medium">abhishek</h4>
                                            <p className="text-sm ">hleo</p>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                        <Link to='/profile' className="flex items-center ml-2 w-fit cursor-pointer gap-4 ">
                                            <UserIcon height={25}/>
                                            <h1 className="hover:underline font-semibold">View Profile</h1>
                                        </Link>
                                </MenuItem>
                                <MenuItem>
                                    <div className="flex gap-4 items-center ml-2 w-fit cursor-pointer  ">
                                        <ArrowRightStartOnRectangleIcon height={25}/>
                                        <p className=" hover:underline font-semibold">Log Out</p>
                                    </div>
                                </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    )
                }
                
                
                </div>
            </div>
        </div>
    );
};

export default Navbar;