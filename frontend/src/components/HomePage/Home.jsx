import React from 'react'
import Navbar from '../shared/Navbar'
import useFetchPreviousWorkout from '../../hooks/useFetchGetPreviousWorkouts'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const fetchPreviousWorkOuts = useFetchPreviousWorkout()
  const navigate = useNavigate()

  const {workouts} = useSelector(state => state.workout)
  const {user} = useSelector(state => state.auth)

  const getExerciseVolumes = (workout) => {
  return workout.exercises?.map((exercise) => {
    const totalVolume = exercise.sets?.reduce((acc, set) => {
      return acc + (set.reps ?? 0) * (set.weight ?? 0);
    }, 0);

    return {
      name: exercise.name,
      totalVolume,
    };
  }) || [];
};

  return (
    <div>
      <Navbar/>
      <div className='max-w-5xl mx-auto mt-10 flex gap-10'>
        <div className='w-3/4 flex flex-col gap-5'>
          {/* Previous Workouts  */}
          {
            workouts?.length >0 && ( workouts?.map((workout) => {
              
                const startTime = new Date(workout?.startTime);
                const endTime = new Date(workout?.endTime);
                const durationMs = endTime - startTime; // gives duration in milliseconds
                const minutes = Math.floor(durationMs / 60000); // 1 minute = 60,000 ms
                const seconds = Math.floor((durationMs % 60000) / 1000);

                const exerciseVolumes = getExerciseVolumes(workout)

                return  <div key={workout?._id} onClick={() => navigate(`/workout/${workout?._id}`)} className='border rounded-xl px-8 py-6 bg-customGray cursor-pointer'>
                  <div className='px-2'>
                    <div className='flex items-center gap-5 mb-5'>
                      <img src={workout?.user?.profile?.url} className='w-14 h-14 rounded-full' />
                      <div>
                        <p className='text-md font-semibold'>{workout?.user?.fullName}</p>
                        <p className='text-xs font-bold'>{workout?.user?.email}</p>  
                      </div>
                    </div>
                    <h1 className=''>{workout?.title?.toUpperCase()}</h1>
                    <div className='flex items-center gap-10'>
                      <div>
                        <h1 className='text-sm font-semibold text-gray-500'>Duration</h1>
                        <p  >{`${minutes}min ${seconds}s`}</p>
                      </div>
                      <div>
                        <h1 className='text-sm font-semibold text-gray-500'>Volume</h1>
                        <ul className="list-disc ml-5 text-sm font-semibold text-gray-300">
                      {exerciseVolumes.map((ex, idx) => (
                        <li key={idx}>
                          {ex.name}: {ex.totalVolume} kg
                        </li>
                      ))}
                    </ul>
                      </div>
                    </div>
                  </div>
                  <hr className='my-5'/>
                  <h1 className='text-lg font-semibold text-gray-400 mx-2'>Workout</h1>
                  {
                    workout?.exercises?.map((exercise) => (
                      <div key={exercise?._id} className='px-6 mb-2' >
                          <h1 className='text-sm font-bold'>{exercise?.sets?.length} Sets {exercise?.name?.toUpperCase()} ({exercise?.equipments})</h1>
                      </div>
                    ))
                  }
                </div>
              })
            )
          }
          
        </div>
        <div className='w-1/4 border rounded-xl p-5 h-fit bg-customGray'>
            <div className='flex flex-col items-center '>
              <img src={user?.profile?.url} className='h-20 rounded-xl' />
              <div className='flex flex-col mt-2'>
                <h1 className='text-sm font-semibold text-gray-200'>{user?.fullName}</h1>
                <h1 className='text-xs font-bold'>{user?.email}</h1>
              </div>
              <button className='border rounded-lg bg-black px-2 py-1  mt-2 text-xs font-semibold hover:bg-gray-700' onClick={() => navigate('/profile')}>View Profile</button>
            </div>
            <div className='border-t mt-2 pt-2'>
              <h1 className='text-gray-400'>Latest Activity</h1>
              <div className='cursor-pointer' onClick={() => navigate(`/workout/${workouts[0]?._id}`)}>
                <h1 className='text-sm text-gray-200 font-semibold'>{workouts[0]?.title.toUpperCase()}</h1>
                <h1 className='text-xs font-bold text-gray-300'>{workouts[0]?.date?.split("T")[0]}</h1>
              </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Home