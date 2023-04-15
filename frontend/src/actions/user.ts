import axios from "axios";

export const getUser: () => Promise<object> = async () => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application.json',
            Authorization: `Token ${token}`
        }
    }

    return axios.get(
        'http://127.0.0.1:8000/api/user/',
        config
    )
}

export const loginApi: (dataSent: object) => Promise<object> = async (dataSent) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.post(
        'http://127.0.0.1:8000/api/v1/dj-rest-auth/login/',
        dataSent,
        config
    )

    localStorage.setItem('token', res.data.key);

    return res;
}

export const registerApi: (dataSent: object) => Promise<object> = async (dataSent) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios.post(
        'http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/',
        dataSent,
        config
    )
}