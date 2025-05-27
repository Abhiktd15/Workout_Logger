import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import AddExerciseDialog from './AddExerciseDialog';

const WorkoutDetails = () => {
    const [open,setOpen] = useState(false)
    const [sets, setSets] = useState([]);

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
                <div className='max-w-3xl   p-5  mx-auto  '>
                    <div className='border rounded-xl p-4 bg-customGray'>
                        <div className='flex items-center justify-between  '>
                            <h1 className='text-4xl font-bold underline underline-offset-8'>Push Day</h1>
                            <p className='text-lg text-gray-200'>Date : 26 May 2025</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-lg mt-5 text-gray-300 mb-2'>Notes : Monster Workout and monster pump</p>
                            <button onClick={() => setOpen(true)} className='bg-customBlue  p-2 px-3 hover:bg-blue-700 rounded-md'>+ Add Exercise</button>
                        </div>
                    </div>

                    <h1 className='text-2xl font-bold mt-4 mb-5 underline '>Exercises</h1>

                    {/* Mapping the exercise data here  */}
                    <div className='flex p-5 border rounded-xl bg-customGray  items-start gap-10'>
                        <div className='w-1/2 mt-4'>
                            <h1 className='text-3xl underline underline-offset-4 font-semibold'> 1. Bench Press</h1>
                            <p className='text-lg font-semibold'>Muscles : Chest,Triceps</p>
                            <p className='text-lg font-semibold'>Equipments : Barbell Rod</p>
                            <p className='text-lg font-semibold'>Type : Strength</p>
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
                                    <th className="p-2  *:">Set</th>
                                    <th className="p-2  *:">Previous</th>
                                    <th className="p-2    ">Weight (kg)</th>
                                    <th className="p-2  ">Reps</th>
                                    <th className="p-2  ">Done</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sets.map((set, index) => (
                                    <tr key={set.id} className="">
                                    <td className=" text-center">{index + 1}</td>
                                    <td className="  ">
                                        <input
                                        type="text"
                                        className="w-full p-1  rounded bg-customGray  "
                                        value={set.previous}
                                        onChange={(e) =>
                                            handleChange(index, "previous", e.target.value)
                                        }
                                        />
                                    </td>
                                    <td className=" ">
                                        <input
                                        type="text"
                                        className="w-full p-1  rounded bg-customGray"
                                        value={set.weight}
                                        onChange={(e) =>
                                            handleChange(index, "weight", e.target.value)
                                        }
                                        />
                                    </td>
                                    <td className="">
                                        <input
                                        type="text"
                                        className="w-full p-1  rounded bg-customGray"
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddExerciseDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default WorkoutDetails