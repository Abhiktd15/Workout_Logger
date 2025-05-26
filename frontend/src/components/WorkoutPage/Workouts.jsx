import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom'
import AddWorkoutDialog from './AddWorkoutDialog'

const workout = [1,2,3,4]

const Workouts = () => {
    const [open,setOpen] = useState(false)

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
                    <div className='w-2/3 border rounded-lg p-4 bg-customGray'>
                        <h1 className='text-xl font-bold'>My Routines (2)</h1>
                        <div className='p-6 gap-4 flex flex-col'>
                            {workout.map((item)=>(
                                <Link to={'/workout/34543534534'} className='flex items-center justify-between bg-[#323232] p-2 px-5 hover:bg-[#201f1f] cursor-pointer border rounded-lg'>
                                    <button>Push Day</button>
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md   text-sm font-semibold text-white shadow-xs  ">
                                                <EllipsisHorizontalIcon className='w-10'/>
                                            </MenuButton>
                                        </div>

                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-customGray shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                        >
                                            <div>
                                                <MenuItem>
                                                    <h1 className="py-2 px-3 hover:bg-black">Edit Routine</h1>
                                                </MenuItem>
                                                <MenuItem>
                                                    <h1 className="py-2 px-3 hover:bg-black">Delete Routine</h1>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AddWorkoutDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Workouts

