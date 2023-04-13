import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';

const PostForm: React.FC = () => {
    return (
        <div className='w-[100%] shadow-md shadow-slate-100 rounded-xl py-3 px-5 bg-white flex items-center'>
            <div>
                <FaUserCircle color='#1d4ed8' size={23}/>
            </div>
            <div className='w-[95%]'>
                <form>
                    <input
                        className='focus:outline-none mx-4 w-full'
                        placeholder="What's on your mind."
                    />
                </form>
            </div>
            <div>
                <AiFillPlusCircle color='#1d4ed8' size={23}/>
            </div>
        </div>
    )
}

export default PostForm;