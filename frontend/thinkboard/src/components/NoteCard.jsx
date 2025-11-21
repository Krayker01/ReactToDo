import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {
    const [isUpdated, setIsUpdated] = useState(false);
    useEffect(() => {
        const created = new Date(note.createdAt).toISOString();
        const updated = new Date(note.updatedAt).toISOString();

        setIsUpdated(created !== updated);
    }, [note.createdAt, note.updatedAt]);
    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            if (!window.confirm("Are you sure you want to delete this note?")) return;
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id));
            toast.success("Note deleted successfully");
        } catch (error) {
            if (error.response?.status === 429) {
                toast.error("Slow down! You're deleting notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                console.log("Error in handleDelete", error);
                toast.error("Failed to delete note");
            }
        }
    };

    return <Link to={`/note/${note._id}`}
        className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <div className="flex flex-col text-xs text-base-content/60 leading-tight">
                    <span>
                        <span className="font-semibold">Created:</span>{" "}
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    {isUpdated && (
                        <span>
                            <span className="font-semibold">Updated:</span>{" "}
                            {formatDate(new Date(note.updatedAt))}
                        </span>
                    )}
                </div>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4' />
                    <button className='btn btn-ghost btn-xs text-error'>
                        <Trash2Icon
                            className='size-4'
                            onClick={(e) => handleDelete(e, note._id)}
                        />
                    </button>
                </div>

            </div>
        </div>
    </Link>
}

export default NoteCard;