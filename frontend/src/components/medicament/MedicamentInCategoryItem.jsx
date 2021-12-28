import React from 'react';
import MyButton from "../UI/button/MyButton";
import {useNavigate} from "react-router-dom";

const MedicamentInCategoryItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className="medicament">
            <div className="medicament__content">
                <strong className="items__titles">{props.medicament.name} </strong>
                <div>
                    {props.medicament.pharm_properties}
                </div>
            </div>
            <div className="medicament__btns">
                <MyButton onClick={() => navigate(`/categories/${props.id}/${props.medicament.id}`)}>открыть</MyButton>
                <MyButton onClick={() => props.remove(props.medicament.id)}>удалить</MyButton>
            </div>
        </div>
    );
};

export default MedicamentInCategoryItem;