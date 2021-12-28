import React, {useState} from 'react';
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import ProductForm from "./ProductForm";
import ListsApi from "../../api/ListsApi";


const ListItem = (props) => {
    const [modal, setModal] = useState(false);
    const [products, setProducts] = useState([])
    const createProduct = () => {
        setModal(false)
    }
    const handleClick = (e) => {
        setModal(true)
        ListsApi.getProductsForMedicament(props.product.id).then(
            function (response) {
                setProducts(response.data)
            }
        )
    }
    return (
        <div className="medicament">
            <MyModal visible={modal} setVisible={setModal}>
                <ProductForm removeWithoutDeletion={props.removeWithoutDeletion} create={createProduct} products={products}/>
            </MyModal>
            <div className="medicament__content">
                <strong className="items__titles">{props.product.name} </strong>
                <div>
                    <h3>Количество: {props.product.quantity}</h3>
                </div>
            </div>
            {/*<div className="medicament__btns">*/}
            {/*    <strong><MyButton onClick={() => {}}>-</MyButton>*/}
            {/*        <MyButton onClick={() => {}}>+</MyButton></strong>*/}
            {/*</div>*/}
            <div className="medicament__btns" style={{"flexDirection": "column"}}>
                <MyButton onClick={() => props.remove(props.product)}>удалить из списка</MyButton>
                <MyButton onClick={handleClick}>ввести срок годности</MyButton>
            </div>
        </div>
    );
};

export default ListItem;