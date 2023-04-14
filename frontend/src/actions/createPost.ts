import axios from "axios";
import { PostInputTypes } from "../types/forms";

export const createPost: (dataSent: PostInputTypes) => Promise<object> = async (dataSent) => {
    const token = localStorage.getItem('token');

    try {
        const formData = new FormData();

        if (dataSent.images) {
            for (let i = 0; i < dataSent.images.length; i++) {
                formData.append('images', dataSent.images[i]);
            }
        }
        formData.append('content', dataSent.content);

        console.log(dataSent, formData);


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${token}`
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/post/',
            formData,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}