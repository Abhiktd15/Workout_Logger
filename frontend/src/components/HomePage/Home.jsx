import React from 'react'
import Navbar from '../shared/Navbar'
import useFetchPreviousWorkout from '../../hooks/useFetchGetPreviousWorkouts'
import { useSelector } from 'react-redux'

const Home = () => {
  const fetchPreviousWorkOuts = useFetchPreviousWorkout()

  const {workouts} = useSelector(state => state.workout)

  return (
    <div>
      <Navbar/>
      <div className='max-w-5xl mx-auto mt-10'>
        <div className='w-3/4 flex flex-col gap-5'>
          {/* Previous Workouts  */}
          {
            workouts?.length >0 && ( workouts?.map((workout) => {
              
                const startTime = new Date(workout?.startTime);
                const endTime = new Date(workout?.endTime);
                const durationMs = endTime - startTime; // gives duration in milliseconds
                const minutes = Math.floor(durationMs / 60000); // 1 minute = 60,000 ms
                const seconds = Math.floor((durationMs % 60000) / 1000);

                //Calculate Volume of sets
                let totalVolume=0
                workout?.exercises?.sets?.map((set) =>{
                   return totalVolume = totalVolume + set.weight*set.reps;
                });
                return  <div className='border rounded-xl px-8 py-6 '>
                  <div className='px-2'>
                    <div className='flex items-center gap-5'>
                      <img src={workout?.user?.profile?.url} className='w-14 h-14 rounded-full' />
                      <div>
                        <p>{workout?.user?.fullName}</p>
                        <p>{workout?.user?.email}</p>  
                      </div>
                    </div>
                    <h1 className=''>{workout?.title?.toUpperCase()}</h1>
                    <div className='flex items-center gap-10'>
                      <div>
                        <h1>Duration</h1>
                        <p>{`Duration: ${minutes} minutes and ${seconds} seconds`}</p>
                      </div>
                      <div>
                        <h1>Volume</h1>
                        <p>{totalVolume}</p>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className='px-2 mt-5' >
                    <h1>Workout</h1>
                    <div>
                      <h1>3 sets Incline Bench (dumbell)</h1>
                      <h1>3 sets Incline Bench (dumbell)</h1>
                      <h1>3 sets Incline Bench (dumbell)</h1>
                    </div>
                  </div>
                </div>
              })
            )
          }
          
        </div>
        <div className='w-1/4'>

          </div>
      </div>
    </div>
  )
}

export default Home