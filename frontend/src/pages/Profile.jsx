import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import ListsApi from "../api/ListsApi";
import ProfileList from "../components/list/ProfileList";


const Profile = () => {
    const [products, setProducts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [expiredProducts, setExpiredProducts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});

    const [fetchProducts, isProductsLoading, productsError] = useFetching(async () => {
        const response = await ListsApi.getNotExpiredProducts();
        const response2 = await ListsApi.getExpiredProducts();
        setProducts(response.data)
        setExpiredProducts(response2.data)
    });

    useEffect(async () => {
            fetchProducts();
        }, []
    )

    useEffect( () => {
        }, [deleted]
    )

    const removeProduct = (product) => {
        setProducts(products.filter(p => p.id !== product.id))
        setExpiredProducts(expiredProducts.filter(p => p.id !== product.id))
        ListsApi.deleteProduct(product.id).then(function(response) {
            console.log(response)
        })
        setDeleted(!deleted)
    }

    return (
        <div className="medicaments">
            <h1 className="title">
                Profile
            </h1>
            <hr style={{margin: '15px 0'}}/>
            {productsError &&
            alert(`error: ${productsError}`)
            }
            {isProductsLoading
                ? <h1>loading...</h1>
                : <div><ProfileList remove={removeProduct} products={expiredProducts} title="Срок годности истёк" classname="profile__expireditem"/>
                <ProfileList remove={removeProduct} products={products} title="Мои препараты" classname="medicament"/></div>
            }
        </div>
    );
}


export default Profile;