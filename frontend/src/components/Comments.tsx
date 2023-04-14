import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getComments } from '../actions/getComments';
import { Comment } from '../types/post';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface CommentsContextType {
    comments: Comment[],
    setComments: (value: Comment[] | ((prevVar: Comment[]) => Comment[])) => void,
    nextComments: string | null,
    setNextComments: (value: string | null | ((prevVar: string | null) => string | null)) => void,
}

export const CommentsContext = createContext<CommentsContextType>({
    comments: [],
    setComments: () => {},
    nextComments: null,
    setNextComments: () => {},
})

interface Props {
    postId?: number
}

const Comments: React.FC<Props> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [nextComments, setNextComments] = useState<string | null>(null);

    const { email } = useSelector((state: any) => state.auth);

    useEffect(() => {
        getComments(postId)
        .then((res: any) => {
            if (res[1]) {
                //handle errors
                return
            }

            setComments(res[0].results);
            setNextComments(res[0].next);
        });
    }, [postId])

    return (
        <div className='w-[95%] m-auto mt-4'>
            <CommentsContext.Provider value={{ comments, setComments, nextComments, setNextComments }}>
                {
                    email ?
                    <CommentForm /> :
                    null
                }
                <CommentList postId={postId} />
            </CommentsContext.Provider>
        </div>
    )
}

export default Comments;