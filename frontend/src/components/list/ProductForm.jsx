import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import ListsApi from "../../api/ListsApi";

const ProductForm = (props) => {
    const [product, setProduct] = useState({expiration_date: '', medicament_id: props.med_id})
    const [manyproducts, setManyProducts] = useState([])

    const addExpirationDate = (e) => {
        e.preventDefault()
        manyproducts.splice(0, 1)
        setManyProducts(manyproducts)
        manyproducts.map(item => {
            setProduct({expiration_date: item.expiration_date, medicament_id: props.med_id})
            ListsApi.addExpirationDate(item.id, item).then(function (response) {
                const newProduct = {
                    ...item, id: response.data.id
                }
                setProduct(newProduct)
                props.create()
                props.removeWithoutDeletion(props.med_id)
            })
        }
        )
        setManyProducts([])
        // props.removeWithoutDeletion(props.med_id)
    }

    useEffect( () => {
        setManyProducts([...manyproducts, product])
        }, [product]
    )

    return (
        <form>
            <div>
            {props.products.map(item => <MyInput
                key={item.id}
                value={item.expiration_date}
                placeholder="expiration date"
                onChange={e => {
                    setProduct({...item, expiration_date: e.target.value})
                }
                }
                type="date" />)}
            </div>
            <MyButton onClick={addExpirationDate}>add to your medicaments</MyButton>
        </form>
    );
};

export default ProductForm;