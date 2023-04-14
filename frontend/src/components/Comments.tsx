import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getComments } from '../actions/getComments';
import { CommentDataTypes } from '../types/comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface CommentsContextType {
    commentsData: CommentDataTypes,
    setCommentsData: (value: CommentDataTypes | ((prevVar: CommentDataTypes) => CommentDataTypes)) => void,
}

export const CommentsContext = createContext<CommentsContextType>({
    commentsData: {
        count: "0",
        next: null,
        previous: null,
        results: []
    },
    setCommentsData: () => {},
})

interface Props {
    postId?: number
}

const Comments: React.FC<Props> = ({ postId }) => {
    const [commentsData, setCommentsData] = useState<CommentDataTypes>({
        count: "0",
        next: null,
        previous: null,
        results: []
    });

    const { email } = useSelector((state: any) => state.auth);

    useEffect(() => {
        getComments(postId)
        .then((res: any) => {
            if (res[1]) {
                //handle errors
                return
            }

            setCommentsData(res[0]);
        });
    }, [postId])

    return (
        <div className='w-[95%] m-auto mt-4'>
            <CommentsContext.Provider value={{ commentsData, setCommentsData }}>
                {
                    email ?
                    <CommentForm postId={postId} /> :
                    null
                }
                <CommentList postId={postId} />
            </CommentsContext.Provider>
        </div>
    )
}

export default Comments;