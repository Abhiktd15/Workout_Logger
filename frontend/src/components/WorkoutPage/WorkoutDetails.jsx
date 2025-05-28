import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import AddExerciseDialog from './AddExerciseDialog';
import { useParams } from 'react-router-dom';
import useFetchWorkoutByID from '../../hooks/useFetchWorkoutByID';
import { useSelector } from 'react-redux';

const WorkoutDetails = () => {
    const params = useParams()
    const workoutID = params.workoutId

    const fetchWorkoutById = useFetchWorkoutByID(workoutID)
    const [open,setOpen] = useState(false)
    const [sets, setSets] = useState([]);

    const {individualWorkout} = useSelector(state => state.workout)

    const handleAddSet = () => {
        setSets([
        ...sets,
        { id: Date.now(), reps: "", weight: "", checked: false }
        ]);
    };
    
    const handleChange = (index, field, value) => {
        const updatedSets = [...sets];
        updatedSets[index][field] = field === "checked" ? !sets[index][field] : value;
        setSets(updatedSets);
    };
    return (        
        <div>
            <Navbar/>
            <div className='max-w-5xl mx-auto mt-10'>
                {
                    individualWorkout && (
                        <div className='max-w-3xl   p-5  mx-auto  '>
                            <div className='border rounded-xl p-4 bg-customGray'>
                                <div className='flex items-center justify-between  '>
                                    <h1 className='text-4xl font-bold underline underline-offset-8'>{individualWorkout?.title}</h1>
                                    <p className='text-lg text-gray-200'>Date : {individualWorkout?.date?.split("T")[0]}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-lg mt-5 text-gray-300 mb-2'>Notes : {individualWorkout?.notes} </p>
                                    <button onClick={() => setOpen(true)} className='bg-customBlue  p-2 px-3 hover:bg-blue-700 rounded-md'>+ Add Exercise</button>
                                </div>
                            </div>

                            <h1 className='text-2xl font-bold mt-4 mb-5 underline '>Exercises</h1>

                            <div className="flex flex-col gap-6">
                                {
                                    individualWorkout?.exercises.length <=0 ? <span>No Exercise Created !!</span> : 
                                    individualWorkout?.exercises?.map((exercise) => (
                                        
                                        <div key={exercise?._id} className='flex p-5 border rounded-xl bg-customGray  items-start gap-10'>
                                            <div className='w-1/2 mt-4'>
                                                <h1 className='text-3xl underline underline-offset-4 font-semibold'>{exercise?.name}</h1>
                                                <div className='text-lg font-semibold mt-4'>Muscles : {exercise?.muscles.map((i,index) => <h1 key={index} className="inline">{i}{", "}</h1>)}</div>
                                                <p className='text-lg font-semibold'>Equipments : {exercise?.equipments}</p>
                                                <p className='text-lg font-semibold'>Type : {exercise?.type}</p>
                                            </div>
                                            <div className="w-full">
                                                <div className='flex  justify-between items-center'>
                                                    <h2 className="text-xl font-bold mb-4">Workout Sets</h2>
                                                    <button
                                                        onClick={handleAddSet}
                                                        className="mb-4 px-4 py-2 bg-customBlue text-white rounded hover:bg-blue-700"
                                                    >
                                                        + Add Set
                                                    </button>
                                                </div>
                                                <table className="min-w-full text-left ">
                                                    <thead className="">
                                                    <tr>
                                                        <th className="p-2 text-center">Set</th>
                                                        <th className="p-2 text-center">Weight (kg)</th>
                                                        <th className="p-2 text-center">Reps</th>
                                                        <th className="p-2 text-center">Done</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {exercise?.sets?.map((set, index) => (
                                                        <tr key={set._id} className="">
                                                        <td className=" text-center">{index + 1}</td>
                                                        <td className=" flex justify-center">
                                                            <input
                                                            type="text"
                                                            className="w-full p-1  rounded text-center bg-customGray "
                                                            value={set?.weight}
                                                            onChange={(e) =>
                                                                handleChange(index, "weight", e.target.value)
                                                            }
                                                            />
                                                        </td>
                                                        <td className="">
                                                            <input
                                                            type="text"
                                                            className="w-full p-1  rounded text-center bg-customGray"
                                                            value={set.reps}
                                                            onChange={(e) =>
                                                                handleChange(index, "reps", e.target.value)
                                                            }
                                                            />
                                                        </td>
                                                        <td className="  text-center">
                                                            <input
                                                            className='size-6 '
                                                            type="checkbox"
                                                            checked={set.checked}
                                                            onChange={() => handleChange(index, "checked")}
                                                            />
                                                        </td>
                                                        </tr>
                                                    ))}
                                                    {/* {sets.map((set,index) => (
                                                        <tr key={set._id} className="">
                                                        <td className=" text-center">{exercise?.sets?.length+ 1 + index}</td>
                                                        <td className=" flex justify-center">
                                                            <input
                                                            type="text"
                                                            className="w-full p-1  rounded text-center bg-customGray "
                                                            value={set?.weight}
                                                            onChange={(e) =>
                                                                handleChange(index, "weight", e.target.value)
                                                            }
                                                            />
                                                        </td>
                                                        <td className="">
                                                            <input
                                                            type="text"
                                                            className="w-full p-1  rounded text-center bg-customGray"
                                                            value={set.reps}
                                                            onChange={(e) =>
                                                                handleChange(index, "reps", e.target.value)
                                                            }
                                                            />
                                                        </td>
                                                        <td className="  text-center">
                                                            <input
                                                            className='size-6 '
                                                            type="checkbox"
                                                            checked={set.checked}
                                                            onChange={() => handleChange(index, "checked")}
                                                            />
                                                        </td>
                                                        </tr>
                                                    ))} */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <AddExerciseDialog open={open} setOpen={setOpen} refetch={fetchWorkoutById} workoutId={workoutID}/>
        </div>
    )
}

export default WorkoutDetails