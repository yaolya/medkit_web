import React, {useContext, useEffect, useState} from 'react';
import '../styles/App.css';
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import CategoriesApi from "../api/CategoriesApi";
import CategoryForm from "../components/category/CategoryForm";
import CategoriesFilter from "../components/category/CategoriesFilter";
import CategoriesList from "../components/category/CategoriesList";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const customCategories = usePosts(categories, filter.sort, filter.query);

    const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching(async (limit, page) => {
        const response = await CategoriesApi.getUsersCategories();
        setCategories(response.data)
    });

    useEffect(async () => {
            fetchCategories();
        }, []
    )

    const createCategory = (newCategory) => {
       setCategories([...categories, newCategory])

        setModal(false)
    }

    const removeCategory = (category) => {
        setCategories(categories.filter(p => p.id !== category.id))
        CategoriesApi.deleteCategory(category.id).then(function(response) {
            console.log(response)
        })
    }

    return (
        <div className="medicaments">
            <MyModal visible={modal} setVisible={setModal}>
                <CategoryForm create={createCategory}/>
            </MyModal>
            <h1 className="title">
                Categories
            </h1>
            <hr style={{margin: '15px 0'}}/>
            <CategoriesFilter
                    filter = {filter}
                    setFilter={setFilter}
                />
            {categoriesError &&
            alert(`error: ${categoriesError}`)
            }
            {isCategoriesLoading
                ? <h1>loading...</h1>
                :
                    <div>
                        <CategoriesList remove={removeCategory} categories={customCategories} title="Категории пользователя"/>
                        <MyButton style={{marginTop: 30, marginBottom: 30}} onClick={() => setModal(true)}>
                            добавить категорию
                        </MyButton>
                    </div>
            }
        </div>
    );
}

export default Categories;
