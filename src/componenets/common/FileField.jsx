import React from 'react'

const FileField = ({ className, onChange, value, name, placeholder, id }) => {
  return (
    <>
        <input
                style={{ fontSize: "1.5rem" }}
                type="file"
                className={`form-control p-3 ${className}`}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
    </>
  )
}

export default FileField
