import React from 'react'
import Navbar from '../shared/Navbar'

const WorkoutDetails = () => {
    return (
        <div>
            <Navbar/>
            <div className='max-w-5xl mx-auto mt-10'>
                <div className='max-w-3xl bg-customGray border rounded-xl p-5  mx-auto  '>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-4xl font-bold underline underline-offset-8'>Push Day</h1>
                        <p className='text-lg text-gray-200'>Date : 26 May 2025</p>
                    </div>
                    <p className='text-lg mt-5 text-gray-300 mb-2'>Notes : Monster Workout and monster pump</p>
                    <hr/>

                    <div>
                        <h1 className='text-2xl font-bold mt-4'>Exercises</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetails