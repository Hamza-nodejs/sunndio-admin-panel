import React from 'react';
import Select from 'react-select';
import { useState } from 'react';

const ReactSelect = ({ options, className, onChange, value, placeholder }) => {


    return (
        <>
            <Select
                className={`form-select p-3 ${className}`}
                style={{ fontSize: "1.5rem" }}
                value={value}
                onChange={onChange}
                options={options.map((option) => ({ value: option._id, label: option.question }))}
                isSearchable={true}
                placeholder={placeholder}
            />
        </>
    )
}

export default ReactSelect
