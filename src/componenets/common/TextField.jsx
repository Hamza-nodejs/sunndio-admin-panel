import React from 'react'

const TextField = ({ onChange,className, name, value, placeholder, id }) => {
    return (
        <>
            <input type="text"
                id = {id}
                onChange={onChange}
                style={{fontSize: "1.5rem"}}
                className={`form-control p-3 ${className}`}
                name={name}
                value={value}
                placeholder={placeholder}
            />
        </>
    )
}

export default TextField;
