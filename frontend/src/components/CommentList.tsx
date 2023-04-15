import React, { useContext } from 'react';
import { TbPointFilled } from 'react-icons/tb';
import user2 from '../images/user2.jpg';
import { CommentsContext } from './Comments';
import moment from 'moment';
import { getComments } from '../actions/comment';
import { CommentDataTypes } from '../types/comment';

interface Props {
    postId: number | undefined
}

const CommentList: React.FC<Props> = ({ postId }) => {

    const { commentsData, setCommentsData } = useContext(CommentsContext);

    const handleLoadMoreComments = () => {
        getComments(postId, commentsData.next)
        .then((res: any) => {
            setCommentsData((prev: CommentDataTypes) => ({...prev, next: res.data.next, results: [...prev.results, ...res.data.results]}));
        })
        .catch(er => {
            //handle errors
        })
    }

    return (
            <>
                {
                    commentsData.results.length !== 0 ?
                    commentsData.results.map((comment: any, idx) => (// any should be Comment
                        <div key={idx} className='my-3 flex gap-2'>
                            <div>
                                <img
                                    src={user2}
                                    alt="user's image"
                                    className='rounded-full w-9'
                                />
                            </div>
                            <div className='max-w-[90%]'>
                                <div className='bg-gray-100 rounded-xl py-2 px-3 flex flex-col'>
                                    <span className='text-sm mb-0.5'>{comment.user.username}</span>
                                    <p className='text-xs font-light break-words'>
                                        {comment.content}
                                    </p>
                                </div>
                                <div className='flex items-center text-[11px] my-0.5 mx-3 text-gray-400 gap-1'>
                                    <span>Like</span>
                                    <TbPointFilled/>
                                    <span>Reply</span>
                                    <TbPointFilled/>
                                    <span>{moment(comment.date).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    )) : null
                }
                {
                    commentsData.next ?
                    <div className='flex justify-end w-[90%] m-auto'>
                        <button
                            onClick={handleLoadMoreComments}
                            className='text-blue-500 text-xs'
                        >Load More</button>
                    </div> :
                    null
                }
            </>
    )
}

export default CommentList;