import React from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'

const UserProfile = () => {
    const {user} = useSelector(state => state.auth)
    const {workouts} = useSelector(state => state.workout)
    return (
        <div>
            <Navbar/>
            <div className='max-w-5xl mx-auto mt-10 flex flex-col gap-10'>
                <div className='border p-5 rounded-2xl flex items-center gap-10  bg-customGray'>
                    <img src={user?.profile?.url} className='w-56 rounded-lg  '/>
                    <div>
                        <h1 className='text-2xl font-bold'>{user?.fullName}</h1>
                        <p className='text-lg font-semibold underline'>{user?.email}</p>
                        <h1 className='text-lg font-medium'>Workouts : {workouts?.length}</h1>
                        <button className='border px-4 py-2 rounded-lg'>Edit Profile</button>
                    </div>
                </div>
                <div className='border p-5 rounded-2xl h-36 bg-customGray '>
                    WORKOUT HISTORY
                </div>
            </div>
        </div>
    )
}

export default UserProfile