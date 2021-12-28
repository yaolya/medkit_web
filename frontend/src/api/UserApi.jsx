import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL

export default class UserApi {
    static async getAllUsers(limit= 10, page= 1) {
        try {
            const response = await axios.get(baseURL + '/users')
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

    static async getUserById(id) {
        const url = baseURL + '/users/' + id.toString()
        const response = await axios.get(url)
        return response;
    }

    static async loginUser(user) {
        // const config = {
        //     headers: { 'content-type': 'application/x-www-form-urlencoded' }
        // }
        const response = await axios.post(baseURL + '/users/login', user)
        return response;
    }

    static async logoutUser() {
        const response = await axios.post(baseURL + '/users/logout', '')
        return response;
    }
}