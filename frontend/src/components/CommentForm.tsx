import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { createComment } from '../actions/comment';
import { CommentDataTypes } from '../types/comment';
import { CommentInputTypes } from '../types/forms';
import { CommentsContext } from './Comments';

interface Props {
    postId: number | undefined
}

const CommentForm: React.FC<Props> = ({ postId }) => {

    const { setCommentsData } = useContext(CommentsContext);

    const { register, handleSubmit, reset, formState: {errors} } = useForm<CommentInputTypes>();

    const onSubmit = (data: any) => {
        createComment({ ...data, postId })
        .then((res: any) => {
            reset();
            setCommentsData((prev: CommentDataTypes) => ({...prev, results: [res.data, ...prev.results]}));
        })
        .catch((er) => {
            //handle error
        })
    };

    return (
        <div className='flex items-center gap-4'>
            <FaUserCircle color='#1d4ed8' size={35}/>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[90%]'>
                <input
                    {...register("content", { required: "This field is required." })}
                    placeholder='Write Your Comment'
                    className='focus:outline-none rounded-lg py-0.5 px-2 w-full border-2 border-gray-200'
                />
                {errors.content ? <p className='text-red-500 text-sm font-light text-center'>{errors.content.message}</p> : null}
            </form>
        </div>
    )
}

export default CommentForm;