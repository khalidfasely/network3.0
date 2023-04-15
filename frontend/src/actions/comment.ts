import axios from "axios";

export const createComment: (dataSent: object) => Promise<object> = async (dataSent) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
    }

    return axios.post(
        'http://127.0.0.1:8000/api/comment/',
        dataSent,
        config
    )
}

export const getComments: (postId: number | undefined, next?: string | null) => Promise<object> = async (postId, next) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios.get(
        `${next ? next : `http://127.0.0.1:8000/api/comments/${postId}`}`,
        config
    )
}