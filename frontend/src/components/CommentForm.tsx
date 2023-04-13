import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { CommentsContext } from './Comments';

const CommentForm: React.FC = () => {

    const { setComments } = useContext(CommentsContext);

    return (
        <div className='flex items-center gap-4'>
            <FaUserCircle color='#1d4ed8' size={35}/>
            <form className='w-[90%]'>
                <input
                    placeholder='Write Your Comment'
                    className='focus:outline-none rounded-lg py-0.5 px-2 w-full border-2 border-gray-200'
                />
            </form>
        </div>
    )
}

export default CommentForm;