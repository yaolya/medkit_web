import React, {useEffect, useState} from 'react';
import ListItem from "../components/list/ListItem";
import {useFetching} from "../hooks/useFetching";
import ListsApi from "../api/ListsApi";

const UsersList = () => {
    const [products, setProducts] = useState([]);
    const [dateInputEnded, setDateInputEnded] = useState(false)

    const [fetchProducts, isProductsLoading, productError] = useFetching(async () => {
        await ListsApi.getProductsForList().then(function(response) {
            console.log("products ", response.data)
            setProducts(response.data)
        })
    });

    useEffect(  async () => {
            fetchProducts();
            console.log("dateInputChanged")
        }, [dateInputEnded]
    )

    const remove = (medicament) => {
        setProducts(products.filter(p => p.id !== medicament.id))
        ListsApi.deleteProductsForMedicament(medicament.id).then(function(response) {
            console.log(response)
        })
    }

    const removeWithoutDeletion = (id) => {
        setProducts(products.filter(p => p.id !== id))
        // setDateInputEnded(true)
        setDateInputEnded(!dateInputEnded)
    }

    return (
        <div className="medicaments">
            <div className="userslist">
                <h1 className="title">
                    User's List
                </h1>
                {products.map((product, index) =>
                     <ListItem removeWithoutDeletion={removeWithoutDeletion} remove={remove} product={product} key={product.id} />
                )}
            </div>
        </div>
    );
};

export default UsersList;