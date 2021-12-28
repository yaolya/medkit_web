import React, {useContext, useEffect, useState} from 'react';
import '../styles/App.css';
import MedicamentsList from "../components/medicament/MedicamentsList";
import MyButton from "../components/UI/button/MyButton";
import MedicamentForm from "../components/medicament/MedicamentForm";
import MedicamentsFilter from "../components/medicament/MedicamentsFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import MedicamentsApi from "../api/MedicamentsApi";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {AuthContext} from "../context";
import CategoriesApi from "../api/CategoriesApi";

function Medicaments() {
    const [medicaments, setMedicaments] = useState([])
    const [medicament, setMedicament] = useState(null)
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const sortedAndSearchedMedicaments = usePosts(medicaments, filter.sort, filter.query);

    const [fetchMedicaments, isMedicamentsLoading, medicamentError] = useFetching(async (limit, page) => {
        const response = await MedicamentsApi.getAllMedicaments(limit, page);
        setMedicaments(response.data)
        // const totalCount = response.headers['x-total-count']
        // setTotalPages(getPageCount(totalCount, limit))
        // CategoriesApi.getAllCategories().then(function(response2){
        //     if (typeof response2 != 'undefined' && response2 != null){
        //         console.log(response2)
        //         setCategories(response2.data)
        //     }
        //     // setCategories([])
        // })
    });

    const [fetchCategories, isCategoriesLoading, categoryError] = useFetching(async () => {
        const response = await CategoriesApi.getAllCategories();
        setCategories(response.data)
    });

    useEffect(async () => {
        fetchMedicaments(limit, page);
        }, [medicament]
    )

    useEffect(async () => {
            fetchCategories();
        }, [categories]
    )

    const createMedicament = (newMedicament) => {
        setMedicaments([...medicaments, newMedicament])
        setModal(false)
    }

    const changePage = (page) => {
        setPage(page)
        fetchMedicaments(limit, page)
    }

    const removeMedicament = (medicament) => {
        setMedicaments(medicaments.filter(p => p.id !== medicament.id))
        MedicamentsApi.deleteMedicament(medicament.id).then(function(response) {
            console.log(response)
        })
    }

    const editMedicament = (id, medicament) => {
        setMedicament(medicament)
    }

    const addImage = () => {
    }


    return (
        <div className="medicaments">
            <MyModal visible={modal} setVisible={setModal}>
                <MedicamentForm edit={editMedicament} create={createMedicament} editMode={false}/>
            </MyModal>
            <h1 className="title">
                Medicaments
            </h1>
            <hr style={{margin: '15px 0'}}/>
            <MedicamentsFilter
                filter = {filter}
                setFilter={setFilter}
            />
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                добавить препарат
            </MyButton>
            {medicamentError &&
                alert(`error: ${medicamentError}`)
            }
            {isMedicamentsLoading
            ? <h1>loading...</h1>
            : <MedicamentsList addImage={addImage} edit={editMedicament} remove={removeMedicament} medicaments={sortedAndSearchedMedicaments} categories={categories} title="Препараты"/>
            }
            {/*<Pagination page={page} changePage={changePage} totalPages={totalPages}/>*/}
        </div>
    );
}

export default Medicaments;
