import React from 'react'

const SelectField = ({ children, onChange, className }) => {
    return (
        <>
            <select 
            className={`form-select p-3 ${className}`}
            style={{ fontSize: "1.5rem" }} 
            onChange={onChange} 
            aria-label="Default select example">
                {
                    children
                }
            </select>
        </>
    )
}

export default SelectField
