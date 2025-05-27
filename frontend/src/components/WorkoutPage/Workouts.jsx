import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetchWorkouts from '../../hooks/useFetchWorkouts'
import Navbar from '../shared/Navbar'
import AddWorkoutDialog from './AddWorkoutDialog'
import axios from 'axios'
import { WORKOUT_API_END_POINT } from '../../constants'
import { toast } from 'react-toastify'


const Workouts = () => {
    const fetchAllWorkout = useFetchWorkouts()
    const [open,setOpen] = useState(false)
    const navigate = useNavigate()
    
    const {workouts } = useSelector(state => state.workout)
    const deleteHandler = async (workoutId) => {
        try {
            const res = await axios.delete(`${WORKOUT_API_END_POINT}/delete/${workoutId}`,{withCredentials:true})
            if(res.data.success){
                toast.success(res.data.message)
                fetchAllWorkout()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    

    return (
        <div className=''>
            <Navbar/>
            <div className=' max-w-5xl mx-auto mt-10'>
                <div className='mb-10 w-fit flex flex-col items-center'>
                    <h1 className='text-2xl  text-white font-bold '> Workout Routines</h1>
                    <hr className='w-1/2 text-center '/>
                </div>
                <div className='text-white flex  gap-10 '>
                    <div  className='w-1/3 border h-fit rounded-xl  p-4 bg-customGray'>
                        <h1  className='text-xl font-bold'>My Workout Routines</h1>
                        <button onClick={() => setOpen(true)} className='border rounded-lg flex items-center py-2 bg-[#323232] text-lg mt-5  hover:scale-105 justify-between gap-4  px-4 '>
                            Add New Routine <PlusIcon className='w-6'/>
                        </button>
                    </div>
                    <div className='w-2/3 border rounded-lg p-4 z-0 bg-customGray'>
                        <h1 className='text-xl font-bold'>My Routines (2)</h1>
                        <div className='p-6 gap-4 flex flex-col'>
                            {workouts.map((workout)=>(
                                <div key={workout?._id}  className='flex items-center justify-between bg-[#323232] p-2 px-5 hover:bg-[#201f1f] cursor-pointer border rounded-lg'>
                                    <div onClick={() => navigate(`/workout/${workout?._id}`)} className='w-3/4'>
                                        <button  className=' text-start font-semibold text-md'>{workout?.title}</button>
                                        <p className='text-gray-400 text-sm'>{workout?.createdAt?.split("T")[0]}</p>
                                    </div>
                                    <Menu as="div" className=" w-1/4  relative inline-block text-right ">
                                        <div>
                                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md   text-sm font-semibold text-white shadow-xs  ">
                                                <EllipsisHorizontalIcon className='w-10'/>
                                            </MenuButton>
                                        </div>

                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md border border-white bg-customGray shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                        >
                                            <div>
                                                <MenuItem>
                                                    <h1 className="py-2 px-3 hover:bg-black">Start Routine</h1>
                                                </MenuItem>
                                                <MenuItem>
                                                    <h1 onClick={() => navigate(`/workout/${workout?._id}`)} className="py-2 px-3 hover:bg-black">Edit Routine</h1>
                                                </MenuItem>
                                                <MenuItem>
                                                    <h1 onClick={() => deleteHandler(workout?._id)} className="py-2 px-3 hover:bg-black">Delete Routine</h1>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AddWorkoutDialog open={open} setOpen={setOpen} refetch={fetchAllWorkout}/>
        </div>
    )
}

export default Workouts

