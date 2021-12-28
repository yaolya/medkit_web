import React from 'react';
import MedicamentItem from "./MedicamentItem";

const MedicamentsList = ({medicaments, title, remove, categories, edit, addImage}) => {

    if (!medicaments.length) {
        return (
            <h1 style={{textAlign: 'center', color: "darkseagreen"}}>
                no medicaments found
            </h1>
        )
    }

    return (
        <div>
            {medicaments.map((medicament) =>
                <MedicamentItem addImage={addImage} edit={edit} categories={categories} remove={remove} medicament={medicament} key={medicament.id}/>
            )}
        </div>
    );
};

export default MedicamentsList;