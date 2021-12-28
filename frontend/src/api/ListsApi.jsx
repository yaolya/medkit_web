import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL
// const userid = Number(localStorage.getItem('current_user_id'))

export default class ListsApi {

    static async getProducts() {
        const userid = Number(localStorage.getItem('current_user_id'))
        const response = await axios.get(baseURL + '/products/withoutquantity/' + userid)
        return response;
    }

    static async getExpiredProducts() {
        const userid = Number(localStorage.getItem('current_user_id'))
        const response = await axios.get(baseURL + '/products/expired/' + userid)
        return response;
    }

    static async getNotExpiredProducts() {
        const userid = Number(localStorage.getItem('current_user_id'))
        const response = await axios.get(baseURL + '/products/notexpired/' + userid)
        return response;
    }

    static async getProductsForProfile() {
        const userid = Number(localStorage.getItem('current_user_id'))
        const response = await axios.get(baseURL + '/products/withdate/' + userid)
        return response;
    }

    static async getProductsForList() {
        const userid = Number(localStorage.getItem('current_user_id'))
        console.log("USERID ", userid)
        const response = await axios.get(baseURL + '/products/withoutdate/' + userid)
        return response;
    }

    static async getProductsForMedicament(id) {
        const userid = Number(localStorage.getItem('current_user_id'))
        const response = await axios.get(baseURL + '/products/'+id + '/' + userid)
        return response;
    }

    static async addProduct(product) {
        const userid = Number(localStorage.getItem('current_user_id'))
        const response = await axios.post(baseURL + '/products/' + userid, product)
        return response;
    }

    static async addExpirationDate(id, product) {
        if (id) {
        const response = await axios.put(baseURL + '/products/' + id, product)
        return response;}
        else {
            return JSON.stringify(product)
        }
    }

    static async deleteProductsForMedicament(id) {
        const userid = Number(localStorage.getItem('current_user_id'))
        console.log("userid for delete ", userid)
        const response = axios.delete(baseURL + '/products/formedicament/' + id + '/' + userid)
        return response
    }

    static async deleteProduct(id) {
        const response = axios.delete(baseURL + '/products/' + id)
        return response
    }
}