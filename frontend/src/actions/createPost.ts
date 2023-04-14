import axios from "axios";

export const createPost: (dataSent: object) => Promise<object> = async (dataSent) => {
    const token = localStorage.getItem('token');

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/post/',
            dataSent,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}