import React, {useContext} from 'react';
import MyButton from "../UI/button/MyButton";
import {useNavigate} from "react-router-dom";

const CategoryItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className="medicament">
            <div className="medicament__content">
                <strong className="items__titles">{props.category.name} </strong>
                <div>
                    {props.category.description}
                </div>
            </div>
            <div className="medicament__btns">
                <MyButton onClick={() => props.remove(props.category)}>удалить</MyButton>
                <MyButton onClick={() => navigate(`/categories/${props.category.id}`)}>открыть</MyButton>
            </div>
        </div>
    );
};

export default CategoryItem;