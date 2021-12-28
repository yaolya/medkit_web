import React from 'react';
import {useParams} from "react-router-dom";
import CategoriesApi from "../api/CategoriesApi";
import {useState} from "react";
import {useFetching} from "../hooks/useFetching";
import {useEffect} from "react";
import MedicamentInCategoryItem from "../components/medicament/MedicamentInCategoryItem";

const CategoryPage = () => {
    const params = useParams()
    const [category, setCategory] = useState({});
    const [medicaments, setMedicaments] = useState([]);
    const [fetchCategoryById, isLoading, error] = useFetching(async (id) => {
        const response = await CategoriesApi.getCategoryById(id)
        setCategory(response.data);
        console.log(response.data)
    })
    const [fetchMedicaments, isMedicamentsLoading, medicamentError] = useFetching(async (id) => {
        const response = await CategoriesApi.getMedicamentsByCategoryId(id)
        setMedicaments(response.data);
        console.log(response.data)
    })

    useEffect(() => {
        fetchCategoryById(params.id)
        fetchMedicaments(params.id)
    }, [])

    const removeMedicamentFromCategory = (medicament_id) => {
        setMedicaments(medicaments.filter(p => p.id !== medicament_id))
        CategoriesApi.removeMedicamentFromCategory(category.id, medicament_id).then(function(response) {
            console.log(response)
        })
    }
    return (
        <div>
        <div className="category__title">
            <h1 className="title">Категория: {category.name}</h1>
            <h3 className="title__small">Описание: {category.description}</h3>
        </div>
        <div className="medicaments">
            {medicaments.map((medicament) =>
                <MedicamentInCategoryItem id={category.id} remove={removeMedicamentFromCategory} medicament={medicament} key={medicament.id}/>
            )}
        </div>
        </div>
    );
};

export default CategoryPage;