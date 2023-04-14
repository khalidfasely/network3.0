import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { PostInputTypes } from '../types/forms';
import { createPost } from '../actions/createPost';
import { useSelector } from 'react-redux';

const PostForm: React.FC = () => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm<PostInputTypes>();

    const [ newPostModalOpen, setNewpostModalOpen ] = useState<boolean>(false);

    const { pk } = useSelector((state: any) => state.auth);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: '0',
            marginTop: '2rem',
            transform: 'translate(-50%, -50%)',
        },
    };

    const onSubmit = (data: any) => {
        createPost(data)
        .then((res: any) => {
            if (res[1]) {
                //handle errors
                console.log('errors', res[1])
                return
            }

            console.log(res[0])
        })
    };

    return (
        <div className='w-[100%] shadow-md shadow-slate-100 rounded-xl py-3 px-5 bg-white flex items-center'>
            <div>
                <FaUserCircle color='#1d4ed8' size={23}/>
            </div>
            <div className='w-[95%]'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        //onClick={() => setNewpostModalOpen(true)}
                        {...register("content", { required: "This field is required." })}
                        className='focus:outline-none mx-4 w-full'
                        placeholder="What's on your mind."
                    />
                </form>
            </div>
            <div>
                <AiFillPlusCircle color='#1d4ed8' size={23}/>
            </div>
            <Modal
                isOpen={newPostModalOpen}
                ariaHideApp={false}
                onRequestClose={() => setNewpostModalOpen(false)}
                style={customStyles}
            >
                Add Post
            </Modal>
        </div>
    )
}

export default PostForm;