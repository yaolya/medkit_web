import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import MedicamentsApi from "../../api/MedicamentsApi";

const MedicamentForm = ({create, edit}) => {
    const [medicament, setMedicament] = useState({name: '', image: '', manufacturer_name: '', pharm_properties: '', contraindications: '', side_effects: '', mode_of_application: '', driving: '', storage_temperature: '', prescription_required: ''})
    const addNewMedicament = (e) => {
        e.preventDefault()
        setMedicament({name: '', image: '', manufacturer_name: '', pharm_properties: '', contraindications: '', side_effects: '', mode_of_application: '', driving: '', storage_temperature: '', prescription_required: ''})
        MedicamentsApi.addMedicament(medicament).then(function(response) {
            console.log("medicament.image ", medicament.image)
            MedicamentsApi.addImage(medicament.image, response.data.id).then(function(response2) {
                console.log(response2)
            })
            const newMedicament = {
                ...medicament, id: response.data.id
            }
            create(newMedicament)
            edit(newMedicament.id, newMedicament)
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
                console.log(e.target.files[0].name)}}
                type="file"
                accept="image/*"
            />
            <MyButton onClick={addNewMedicament}>add medicament</MyButton>
        </form>
    );
};

export default MedicamentForm;