import React, {useContext, useEffect, useState} from 'react';
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import AddToListForm from "../list/AddToListForm";
import MySelect from "../UI/select/MySelect";
import CategoriesApi from "../../api/CategoriesApi";
import EditMedicamentForm from "./EditMedicamentForm";
import Image from "react-bootstrap/Image";
import {useFetching} from "../../hooks/useFetching";
import MedicamentsApi from "../../api/MedicamentsApi";
import {useNavigate} from "react-router-dom";


const MedicamentItem = (props) => {
    const navigate = useNavigate()
    const [productModal, setProductModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("add to category");
    const [imageLoaded, setImageLoaded] = useState(false);
    const [fetchImage, isLoading, error] = useFetching(async (id) => {
        await MedicamentsApi.getImage(id).then(function (response2){
            console.log("image after get ", response2.data)
            if (Boolean(response2.data.size)) {
                props.medicament.image = URL.createObjectURL(response2.data)
            }
            else {
                props.medicament.image = null
            }
            setImageLoaded(!imageLoaded)
        })
    })
        useEffect(() => {
            console.log("fetch image    ")
            fetchImage(props.medicament.id)
        }, [])

        useEffect(() => {
            console.log("imageLoaded")
        }, [imageLoaded])

    const createProduct = () => {
        setProductModal(false)
    }
    const updateMedicament = () => {
        setEditModal(false)
    }

    return (
        <div className="medicament">
            <MyModal visible={productModal} setVisible={setProductModal}>
                <AddToListForm create={createProduct} med_id={props.medicament.id}/>
            </MyModal>
            <MyModal visible={editModal} setVisible={setEditModal}>
                <EditMedicamentForm edit={props.edit} create={updateMedicament} medicamentToEdit={props.medicament}/>
            </MyModal>
            <div className="medicament__content">
                <div style={{"display": "flex"}}>
                    <Image style={{ maxWidth: '7rem', maxHeight: '7rem', marginTop:3}} src={props.medicament.image}/>
                    <div style={{"marginLeft":30}}>
                        <strong className="items__titles">{props.medicament.name} </strong>
                        <div>
                            {props.medicament.pharm_properties}
                        </div>
                    </div>
                </div>
            </div>
                <div className="medicament__btns">
                    <MyButton onClick={() => navigate(`/medicaments/${props.medicament.id}`)}>открыть</MyButton>
                    <MyButton onClick={() => {setEditModal(true)}}>редактировать</MyButton>
                    <MyButton onClick={() => props.remove(props.medicament)}>удалить</MyButton>
                    <MyButton onClick={() => setProductModal(true)}>добавить в список покупок</MyButton>
                    <MySelect
                        name="add to category"
                        value={selectedCategory}
                        defaultValue="add to category"
                        onChange={s => {
                            setSelectedCategory(s)
                            CategoriesApi.addMedicamentToCategory(props.medicament.id, s).then(function(response) {
                                console.log("adding m to c ", response)
                            })
                        }
                        }
                        options={props.categories.map(function(category) {
                            return {name: category.name, value: category.id}
                            }
                        )}
                    />
                </div>
        </div>
    );
};

export default MedicamentItem;