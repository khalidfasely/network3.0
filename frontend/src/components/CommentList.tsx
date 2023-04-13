import React, { useContext, useEffect } from 'react';
import { TbPointFilled } from 'react-icons/tb';
import user2 from '../images/user2.jpg';
import { CommentsContext } from './Comments';

const CommentList: React.FC = () => {

    const { comments } = useContext(CommentsContext);

    useEffect(() => {
        console.log(comments)
    }, [comments])

    return (
        <div className=''>
            <div className='my-3 flex gap-2'>
                <div>
                    <img
                        src={user2}
                        alt="user's image"
                        className='rounded-full w-9'
                    />
                </div>
                <div>
                    <div className='bg-gray-100 rounded-xl py-2 px-3 flex flex-col'>
                        <span className='text-sm mb-0.5'>Macie Bellis</span>
                        <p className='text-xs font-light'>
                            Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolor.
                        </p>
                    </div>
                    <div className='flex items-center text-[11px] my-0.5 mx-3 text-gray-400 gap-1'>
                        <span>Like</span>
                        <TbPointFilled/>
                        <span>Reply</span>
                        <TbPointFilled/>
                        <span>1h</span>
                    </div>
                </div>
            </div>

            <div className='my-3 flex gap-2'>
                <div>
                    <img
                        src={user2}
                        alt="user's image"
                        className='rounded-full w-9'
                    />
                </div>
                <div className='max-w-[90%]'>
                    <div className='bg-gray-100 rounded-xl py-2 px-3 flex flex-col'>
                        <span className='text-sm mb-0.5'>Macie Bellis</span>
                        <p className='text-xs font-light'>
                        incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.incididunt ut labore et dolor.
                        </p>
                    </div>
                    <div className='flex items-center text-[11px] my-0.5 mx-3 text-gray-400 gap-1'>
                        <span>Like</span>
                        <TbPointFilled/>
                        <span>Reply</span>
                        <TbPointFilled/>
                        <span>1h</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CommentList;