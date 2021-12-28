import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL

export default class MedicamentsApi {
    static async getAllMedicaments(limit= 10, page= 1) {
        try {
            const response = await axios.get(baseURL + '/medicaments', {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
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

    static async getMedicamentById(id) {
        const response = await axios.get(baseURL + '/medicaments/' + id)
        return response;
    }

    static async addMedicament(medicament) {
        const response = await axios.post(baseURL + '/medicaments/', medicament)
        return response;
    }

    static async addImage(image, id) {
        try {
            console.log("image to add to image ", image)
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            const formData = new FormData();
            if (image != null) {
                if (typeof image.name !== 'undefined')
                {
                    formData.append('image', image);
                    const response = await axios.post(baseURL + '/medicaments/image/' + id, formData, config)
                    return response}
                else {return null}
            }
            else {
                return null
            }
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

    static async getImage(id) {
        try {
            const response = await axios.get(baseURL + '/medicaments/image/' + id, {responseType: 'blob'})
            console.log("dataaa ", response.data)
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

    static async deleteMedicament(id) {
        const response = axios.delete(baseURL + '/medicaments/' + id)
        return response
    }

    static async editMedicament(id, medicament) {
        const response = axios.put(baseURL + '/medicaments/' + id, medicament)
        return response
    }
}