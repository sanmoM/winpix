import React from 'react'

export default function TextAreaInput({value, onChange, placeholder}: any) {
    return (
        <textarea
            id="brief"
            name="brief"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='resize-none border focus:outline-0 h-32 bg-bg-primary rounded-sm p-4'
        />
    )
}
