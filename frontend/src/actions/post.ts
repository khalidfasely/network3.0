import axios from "axios";
import { PostInputTypes } from "../types/forms";

export const uploadImagesApi: (formData: object) => Promise<object> = async (formData) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`
        }
    }

    return axios.post(
        'http://127.0.0.1:8000/api/upload_images/',
        formData,
        config
    )
}

export const createPost: (dataSent: PostInputTypes) => Promise<object> = async (dataSent) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        }
    }

    return axios.post(
        'http://127.0.0.1:8000/api/post/',
        dataSent,
        config
    )
}

export const getPosts: (next?: string | null) => Promise<object> = async (next) => {

    const config = {
        headers: {
            'Content-type': 'application-json'
        }
    }

    return axios.get(
        `${next ? next : 'http://127.0.0.1:8000/api/post/'}`,
        config
    )
}