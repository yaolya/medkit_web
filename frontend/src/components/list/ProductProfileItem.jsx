import React, {useEffect, useState} from 'react';
import MyButton from "../UI/button/MyButton";
import {useFetching} from "../../hooks/useFetching";
import MedicamentsApi from "../../api/MedicamentsApi";

const ProductProfileItem = (props) => {
    const [profileItem, setProfileItem] = useState({id: props.product.id, name: null, expiration_date: props.product.expiration_date})
    const [fetchImage, isLoading, error] = useFetching(async (id) => {
        await MedicamentsApi.getMedicamentById(props.product.medicament_id).then(async function(response) {
            setProfileItem({id: props.product.id, name: response.data.name, expiration_date: props.product.expiration_date})
        })

    })
    useEffect(() => {
        fetchImage(props.product.medicament_id)
    }, [])

    var date = profileItem.expiration_date;
    const dateNoTime = date.split(' ')[1].toString() + ' ' + date.split(' ')[2].toString() + ' '  + date.split(' ')[3].toString()
    return (
        <div className={props.classname}>
            <div className="medicament__content">
                <div>{profileItem.image}</div>
                <strong className="items__titles">{profileItem.name} </strong>
                <div>
                    <h3>Срок годности: {dateNoTime}</h3>
                </div>
            </div>
            <div className="medicament__btns">
                <MyButton onClick={() => props.remove(props.product)}>delete</MyButton>
            </div>
        </div>
    );
};

export default ProductProfileItem;