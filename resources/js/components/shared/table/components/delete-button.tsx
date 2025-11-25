import React from 'react'

export default function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
    return (


        <button
            type="button"
            onClick={() => handleDelete()}
            className="cursor-pointer rounded-md bg-red-500 p-2 font-medium text-white"
        >
            Delete
        </button>
    )
}
