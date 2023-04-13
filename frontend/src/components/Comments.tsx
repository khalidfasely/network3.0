import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getComments } from '../actions/getComments';
import { Comment } from '../types/post';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface CommentsContextType {
    comments: Comment[],
    setComments: (value: Comment[] | ((prevVar: Comment[]) => Comment[])) => void,
}

export const CommentsContext = createContext<CommentsContextType>({
    comments: [],
    setComments: () => {}
})

interface Props {
    postId?: number
}

const Comments: React.FC<Props> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const { email } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (postId) { //remove the check when you remove the static posts
            getComments(postId)
            .then((res: any) => {
                if (res[1]) {
                    //handle errors
                    return
                }

                setComments(res[0]);
                //console.log(res[0]);
            });
        }
    }, [])

    return (
        <div className='w-[95%] m-auto mt-4'>
            <CommentsContext.Provider value={{ comments, setComments }}>
                {
                    email ?
                    <CommentForm /> :
                    null
                }
                <CommentList />
            </CommentsContext.Provider>
        </div>
    )
}

export default Comments;