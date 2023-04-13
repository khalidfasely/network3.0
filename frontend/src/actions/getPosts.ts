import axios from "axios";

export const getPosts: () => Promise<object> = async () => {

    try {
        const config = {
            headers: {
                'Content-type': 'application-json'
            }
        }

        const {data} = await axios.get(
            'http://127.0.0.1:8000/api/posts/',
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}