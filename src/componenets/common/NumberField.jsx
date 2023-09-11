import React from 'react'

const NumberField = ({ className, onChange, value, name, placeholder, id, onBlur, ref }) => {
    return (
        <>
            <input
                style={{ fontSize: "1.5rem" }}
                type="number"
                className={`form-control p-3 ${className}`}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
            />
        </>
    )
}

export default NumberField
