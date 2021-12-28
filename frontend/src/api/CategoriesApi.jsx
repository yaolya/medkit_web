import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL

export default class CategoriesApi {
    static async getAllCategories() {
        const userid = Number(localStorage.getItem('current_user_id'))
        try {
            const response = await axios.get(baseURL + '/categories/all/' + userid)
            return response
        } catch (e) {
            if (e.response) {
                if (e.response.status === 401)
                    return null
            }
            else {
                console.log(e)
                return null
            }
        }
    }

    static async getCategoryById(id) {
        const response = await axios.get(baseURL + '/categories/' + id)
        return response;
    }

    static async getUsersCategories() {
        const userid = Number(localStorage.getItem('current_user_id'))
        const response = await axios.get(baseURL + '/categories/users/' + userid)
        return response;
    }

    // static async getDefaultCategories() {
    //     const response = await axios.get('/categories/default')
    //     return response;
    // }

    static async addCategory(category) {
        const userid = Number(localStorage.getItem('current_user_id'))
        const response = await axios.post(baseURL + '/categories/' + userid, category)
        return response;
    }

    static async deleteCategory(id) {
        const response = axios.delete(baseURL + '/categories/' + id)
        return response;
    }

    static async getMedicamentsByCategoryId(id) {
        const response = await axios.get(baseURL + `/categories/${id}/medicaments`)
        return response;
    }

    static async addMedicamentToCategory(medicament_id, category_id) {
        const response = await axios.post(baseURL + '/categories/'+medicament_id+'/'+category_id)
        return response;
    }

    static async removeMedicamentFromCategory(category_id, medicament_id) {
        const response = await axios.delete(baseURL + '/categories/'+medicament_id+'/'+category_id)
        return response;
    }
}