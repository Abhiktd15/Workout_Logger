import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { EXERCISE_API_END_POINT } from "../../constants";
import { toast } from "react-toastify";

const AddExerciseDialog = ({ open, setOpen,refetch,workoutId }) => {
    const [loading,setLoading] = useState(false)

    const [input,setInput] = useState({
        name:"",
        muscles:[],
        equipments:"",
        type:"",
    })

    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name] :e.target.value})
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post(`${EXERCISE_API_END_POINT}/${workoutId}`,input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                refetch(workoutId);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
            setOpen(false)
        }
        
        
    }
    
    const dialogRef = useRef(null);

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen]);
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex items-center justify-center z-50">
        <div ref={dialogRef} className="bg-customGray p-6 rounded-xl shadow-xl w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Add Exercise</h2>

            <form  onSubmit={submitHandler}>
                <div className="flex flex-col gap-4 mb-4 text-gray-300">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="name" className="text-right text-lg font-medium ">Name</label>
                        <input
                        id="name"
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={changeEventHandler}
                        placeholder="Name "
                        className="w-full border p-2  rounded col-span-3 bg-[#09090B]"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="email" className="text-right text-lg font-medium ">Muscles</label>
                        <input
                        id="muscles"
                        type="text"
                        value={input.muscles}
                        onChange={changeEventHandler}
                        name="muscles"
                        placeholder="Muscles"
                        className="w-full border p-2  rounded col-span-3 bg-[#09090B]"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="phone" className="text-right text-lg font-medium ">Equipments</label>
                        <input
                        id="equipments"
                        type="text"
                        value={input.equipments}
                        onChange={changeEventHandler}
                        name="equipments"
                        placeholder="Equipments"
                        className="w-full border p-2  rounded col-span-3 bg-[#09090B]"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="skills" className="text-right text-lg font-medium ">Type</label>
                        <select 
                            name="type"
                            value={input.type}
                            onChange={changeEventHandler}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 bg-[#09090B]">
                                <option value="" disabled defaultChecked>Select a Type</option>
                                <option value="strength">Strength</option>
                                <option value="cardio">Cardio</option>
                                <option value="stretching">Stretching</option>
                        </select>
                    </div>

                </div>

                <div className="flex items-center justify-between gap-3 w-full">
                <button
                    type="submit"
                    className="px-4 py-2 bg-customBlue text-white rounded-lg text-lg font-semibold w-full"
                >
                    {loading? "Loading..." : "Update"}
                </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default AddExerciseDialog;