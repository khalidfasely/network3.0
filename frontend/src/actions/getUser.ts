import axios from "axios";

export const getUser: () => Promise<object> = async () => {
    const token = localStorage.getItem('token');

    try {
        const config = {
            headers: {
                'Content-Type': 'application.json',
                Authorization: `Token ${token}`
            }
        }

        const {data} = await axios.get(
            'http://127.0.0.1:8000/api/user/',
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}