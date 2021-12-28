import React from 'react';
import ProductProfileItem from "./ProductProfileItem";

const ProfileList = ({products, title, remove, classname}) => {
    return (
        <div>
            <h1 className="title__small">
                {title}
            </h1>
            {products.map((product) =>
            <ProductProfileItem remove={remove} product={product} key={product.id} classname={classname}/>
            )}
        </div>
    );
};

export default ProfileList;