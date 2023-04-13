import axios from 'axios';

export const registerApi: (dataSent: object) => Promise<object> = async (dataSent) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/',
            dataSent,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}