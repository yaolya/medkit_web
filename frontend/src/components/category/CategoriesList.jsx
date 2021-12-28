import React from 'react';
import CategoryItem from "./CategoryItem";

const CategoriesList = ({categories, title, remove}) => {

    return (
        <div>
            <h1 className="title__small">
                {title}
            </h1>
            {categories.map((category) =>
                <CategoryItem remove={remove} category={category} key={category.id}/>
            )}
        </div>
    );
};

export default CategoriesList;