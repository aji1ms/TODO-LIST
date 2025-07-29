import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

type Items = {
    title: string;
    id: string;
}[];

const FormPart = () => {
    const [item, setItem] = useState<Items>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [editId, setEditId] = useState<string>("")

    useEffect(() => {
        let storedTodos = localStorage.getItem("todoItems");
        if (storedTodos) {
            setItem(JSON.parse(storedTodos));
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;
        if (editId) {
            const updatedItems = item.map((todo) =>
                todo.id === editId ? { ...todo, title: inputValue } : todo
            );
            setItem(updatedItems);
            localStorage.setItem("todoItems", JSON.stringify(updatedItems));
            setEditId("");
        } else {
            const newTask = { title: inputValue, id: uuidv4() };
            const updatedTasks = [...item, newTask];
            setItem(updatedTasks);
            localStorage.setItem("todoItems", JSON.stringify(updatedTasks));
        }

        setInputValue("");
    };

    const handleDelete = (id: string) => {
        const updatedTasks = item.filter((todo) => todo.id !== id);
        setItem(updatedTasks);
        localStorage.setItem("todoItems", JSON.stringify(updatedTasks));
    };

    const handleEdit = (id: string) => {
        const editItem = item.find((item) => item.id === id);
        setInputValue(editItem?.title || "");
        setEditId(editItem?.id || "");
    };

    return (
        <div className='w-[350px] mt-8'>
            <form className='mb-2'
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={inputValue}
                    placeholder='text'
                    className='w-full rounded-sm p-2 mb-1 bg-gray-100 border border-black'
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className='bg-gray-500 py-2 w-full text-white'
                    type='submit'
                >
                    {editId ? 'EDIT' : 'ADD'}
                </button>
            </form>
            <div className='mt-6 h-96 overflow-y-auto'>
                {item.map((data) => (
                    <div
                        key={data.id}
                        className='flex justify-between items-center border border-slate-600 py-3 mb-2'>
                        <p className='ml-1'>{data.title}</p>
                        <div>
                            <button
                                onClick={() => handleEdit(data.id)}
                                className='mr-3'>
                                <MdEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(data.id)}
                                className='text-red-700 mr-1'>
                                <RiDeleteBin6Line />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FormPart;
