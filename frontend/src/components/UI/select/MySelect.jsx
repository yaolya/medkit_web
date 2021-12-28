import React from 'react';

const MySelect = ({options, defaultValue, value, onChange, name}) => {
    return (
        <select
            name={name}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option selected={true} disabled="disabled">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;