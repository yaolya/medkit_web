import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import ListsApi from "../../api/ListsApi";

const AddToListForm = (props) => {
    const [product, setProduct] = useState({quantity: '', expiration_date: '', medicament_id: props.med_id})
    const addToList = (e) => {
        e.preventDefault()
        setProduct({quantity: '', expiration_date: '', medicament_id: props.med_id})
        ListsApi.addProduct(product).then(function(response) {
            const newProduct = {
                ...product, id: response.data.id, medicament_id: response.data.medicament_id
            }
            props.create(newProduct)
        })
    }
    return (
        <form>
            <MyInput
                value={product.quantity}
                onChange={e => setProduct({...product, quantity: e.target.value})}
                type="text"
                placeholder="quantity"
            />
            <MyButton onClick={addToList}>add medicament to your list</MyButton>
        </form>
    );
};

export default AddToListForm;