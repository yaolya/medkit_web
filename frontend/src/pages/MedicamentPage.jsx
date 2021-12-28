import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import MedicamentsApi from "../api/MedicamentsApi";
import Image from 'react-bootstrap/Image'

const MedicamentPage = () => {
    const params = useParams()
    const [noImage, setNoImage] = useState(true)
    const [medicament, setMedicament] = useState({});
    const [fetchMedicamentById, isLoading, error] = useFetching(async (id) => {
        const response = await MedicamentsApi.getMedicamentById(id)
        await MedicamentsApi.getImage(response.data.id).then(function (response2){
            if (Boolean(response2.data.size)) {
                setNoImage(false)
            }
            else {
                setNoImage(true)
            }
            setMedicament({...response.data, image:URL.createObjectURL(response2.data)})
        })

    })

    useEffect(() => {
        fetchMedicamentById(params.id)
    }, [])

    return (
        <div className="category__title">
            <div>
            <h1 className="title">Препарат: {medicament.name}</h1>
            {(medicament.manufacturer_name != null) &&
            <h3 className="title__small">Производитель: {medicament.manufacturer_name}</h3>
            }
            {(medicament.pharm_properties != '') &&
            <h3 className="title__small">Фармакологические свойства: {medicament.pharm_properties}</h3>
            }
            {(medicament.contraindications != '') &&
            <h3 className="title__small">Противопоказания: {medicament.contraindications}</h3>
            }
            {(medicament.side_effects != '') &&
            <h3 className="title__small">Побочные эффекты: {medicament.side_effects}</h3>
            }
            {(medicament.mode_of_application != '') &&
            <h3 className="title__small">Способ применения и дозы: {medicament.mode_of_application}</h3>
            }
            {(medicament.driving != null) &&
            <h3 className="title__small">Влияние на управление транспортными средствами: {medicament.driving.toString()}</h3>
            }
            {(medicament.storage_temperature != null) &&
            <h3 className="title__small">Температура хранения: {medicament.storage_temperature}</h3>
            }
            {(medicament.prescription_required != null) &&
            <h3 className="title__small">Отпуск по рецепту: {medicament.prescription_required.toString()}</h3>
            }
            </div>
            {!noImage &&
                <Image style={{ maxWidth: '24rem', maxHeight: '24rem', marginTop:30}} src={medicament.image} fluid/>
            }
        </div>
    );
};

export default MedicamentPage;