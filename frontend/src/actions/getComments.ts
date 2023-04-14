import axios from "axios";

export const getComments: (postId: number | undefined, next?: string | null) => Promise<object> = async (postId, next) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.get(
            `${next ? next : `http://127.0.0.1:8000/api/comments/${postId}`}`,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}