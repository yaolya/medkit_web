import React, {useEffect, useState} from 'react';
import MedicamentsApi from "../../api/MedicamentsApi";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const EditMedicamentForm = ({create, medicamentToEdit, edit}) => {
    const [medicament, setMedicament] = useState({name: medicamentToEdit.name, image: medicamentToEdit.image, manufacturer_name: medicamentToEdit.manufacturer_name, pharm_properties: medicamentToEdit.pharm_properties, contraindications: medicamentToEdit.contraindications, side_effects: medicamentToEdit.side_effects, mode_of_application: medicamentToEdit.mode_of_application, driving: medicamentToEdit.driving, storage_temperature: medicamentToEdit.storage_temperature, prescription_required: medicamentToEdit.prescription_required})
    const editMedicament = (e) => {
        e.preventDefault()
        setMedicament({name: medicamentToEdit.name, image: medicamentToEdit.image, manufacturer_name: medicamentToEdit.manufacturer_name, pharm_properties: medicamentToEdit.pharm_properties, contraindications: medicamentToEdit.contraindications, side_effects: medicamentToEdit.side_effects, mode_of_application: medicamentToEdit.mode_of_application, driving: medicamentToEdit.driving, storage_temperature: medicamentToEdit.storage_temperature, prescription_required: medicamentToEdit.prescription_required})
        MedicamentsApi.editMedicament(medicamentToEdit.id, medicament).then(function(response) {
            if (medicament.image != null) {
                MedicamentsApi.addImage(medicament.image, response.data.id).then(function(response2) {
                    console.log(response2)
                })}
            const newMedicament = {
                ...medicament, id: response.data.id
            }
            console.log("newMedicament ", newMedicament)
            create(newMedicament)
            edit(medicamentToEdit.id, newMedicament)
        })
    }

    return (
        <form>
            <MyInput
                value={medicament.name}
                onChange={e => setMedicament({...medicament, name: e.target.value})}
                type="text"
                placeholder="название"
            />
            <MyInput
                value={medicament.manufacturer_name}
                onChange={e => setMedicament({...medicament, manufacturer_name: e.target.value})}
                type="text"
                placeholder="производитель"
            />
            <MyInput
                value={medicament.pharm_properties}
                onChange={e => setMedicament({...medicament, pharm_properties: e.target.value})}
                type="text"
                placeholder="фармакологические свойства"
            />
            <MyInput
                value={medicament.contraindications}
                onChange={e => setMedicament({...medicament, contraindications: e.target.value})}
                type="text"
                placeholder="противопоказания"
            />
            <MyInput
                value={medicament.side_effects}
                onChange={e => setMedicament({...medicament, side_effects: e.target.value})}
                type="text"
                placeholder="побочные эффекты"
            />
            <MyInput
                value={medicament.mode_of_application}
                onChange={e => setMedicament({...medicament, mode_of_application: e.target.value})}
                type="text"
                placeholder="способ применения и дозы"
            />
            <MyInput
                value={medicament.driving}
                onChange={e => setMedicament({...medicament, driving: e.target.value})}
                type="text"
                placeholder="управление транспортными средствами: 0/1"
            />
            <MyInput
                value={medicament.storage_temperature}
                onChange={e => setMedicament({...medicament, storage_temperature: e.target.value})}
                type="text"
                placeholder="температура хранения"
            />
            <MyInput
                value={medicament.prescription_required}
                onChange={e => setMedicament({...medicament, prescription_required: e.target.value})}
                type="text"
                placeholder="отпуск по рецепту: 0/1"
            />
            <MyInput
                onChange={e => {setMedicament({...medicament, image: e.target.files[0]})
                }}
                type="file"
                accept="image/*"
            />
            <MyButton onClick={editMedicament}>edit medicament</MyButton>
        </form>
    );
};

export default EditMedicamentForm;