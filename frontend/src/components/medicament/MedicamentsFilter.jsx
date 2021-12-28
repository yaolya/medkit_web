import React from 'react';
import MyInput from "../UI/input/MyInput";

const MedicamentsFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
            />
        </div>
    );
};

export default MedicamentsFilter;