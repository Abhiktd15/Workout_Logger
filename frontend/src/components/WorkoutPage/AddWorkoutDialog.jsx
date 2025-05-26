import { useEffect, useRef, useState } from "react";

const AddWorkoutDialog = ({ open, setOpen }) => {
    const [loading,setLoading] = useState(false)

    const [input,setInput] = useState({
        title:"",
        date:"",
        startTime:"",
        endTime:"",
        notes:""
    })

    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name] :e.target.value})
    }
    // const fileChangeHandler = (e) => {
    //     const file = e.target.files?.[0]
    //     setInput({...input,file})
    // }
    const submitHandler = async(e) => {
        e.preventDefault();
        console.log(input)
        setOpen(false)
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
            <h2 className="text-xl font-bold mb-4">Add Workout</h2>

            <form  onSubmit={submitHandler}>
                <div className="flex flex-col gap-4 mb-4 text-gray-300">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="name" className="text-right text-lg font-medium ">Title</label>
                        <input
                        id="title"
                        type="text"
                        name="title"
                        value={input.title}
                        onChange={changeEventHandler}
                        placeholder="Title"
                        className="w-full border p-2  rounded col-span-3 bg-[#09090B]"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="email" className="text-right text-lg font-medium ">Start Time</label>
                        <input
                        id="startTime"
                        type="time"
                        value={input.startTime}
                        onChange={changeEventHandler}
                        name="startTime"
                        placeholder="Start Time"
                        className="w-full border p-2  rounded col-span-3 bg-[#09090B]"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="phone" className="text-right text-lg font-medium ">End Time</label>
                        <input
                        id="endTime"
                        type="time"
                        value={input.endTime}
                        onChange={changeEventHandler}
                        name="endTime"
                        placeholder="End Time"
                        className="w-full border p-2  rounded col-span-3 bg-[#09090B]"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="skills" className="text-right text-lg font-medium ">Notes</label>
                        <input
                        type="text"
                        value={input.notes}
                        onChange={changeEventHandler}
                        id="notes"
                        name="notes"
                        placeholder="Notes..."
                        className="w-full border p-2  rounded col-span-3 bg-[#09090B]"
                        />
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

export default AddWorkoutDialog;