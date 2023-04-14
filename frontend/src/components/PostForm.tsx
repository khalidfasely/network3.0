import React, { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { PostInputTypes } from '../types/forms';
import { createPost } from '../actions/createPost';
import { PostsContext } from '../pages/Home';
import { Post } from '../types/post';

const PostForm: React.FC = () => {
    const [ images, setImages ] = useState<File[]>();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostInputTypes>();

    const [ newPostModalOpen, setNewpostModalOpen ] = useState<boolean>(false);

    const { setPosts } = useContext(PostsContext);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: '0',
            marginTop: '2rem',
            transform: 'translate(-50%, -50%)',
            minWidth: '27rem'
        },
    };

    const onSubmit = (data: any) => {
        createPost(data)
        .then((res: any) => {
            if (res[1]) {
                //handle errors
                return
            }

            reset();
            setPosts((prev: Post[]) => [res[0], ...prev]);
        })
    };

    return (
        <div className='w-[100%] shadow-md shadow-slate-100 rounded-xl py-3 px-5 bg-white flex items-center'>
            <div>
                <FaUserCircle color='#1d4ed8' size={23}/>
            </div>
            <div className='w-[95%]'>
                <div className='flex'>
                    <div className='w-full'>
                        <input
                            onClick={() => setNewpostModalOpen(true)}
                            className='focus:outline-none mx-4 w-full'
                            placeholder="What's on your mind."
                        />
                    </div>
                    <button onClick={() => setNewpostModalOpen(true)}>
                        <AiFillPlusCircle color='#1d4ed8' size={23} />
                    </button>
                </div>
            </div>
            <Modal
                isOpen={newPostModalOpen}
                ariaHideApp={false}
                onRequestClose={() => setNewpostModalOpen(false)}
                style={customStyles}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full'>
                        <input
                            //onClick={() => setNewpostModalOpen(true)}
                            {...register("content", { required: "This field is required." })}
                            className='focus:outline-none mx-4 w-full'
                            placeholder="What's on your mind."
                        />
                        {errors.content ? <p className='text-red-500 text-sm font-light text-center'>{errors.content.message}</p> : null}
                    </div>
                    <div className='flex flex-col my-1'>
                        <label htmlFor='images' className='block text-sm font-medium text-gray-900 dark:text-white'>Add Images: </label>
                        {/*<input
                            //className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            type='file'
                            id='images'
                            name='images'
                            onChange={(e: any) => setImages(e.target.files)}
                            multiple accept="image/png, image/jpeg"
                        />*/}
                        <input
                            {...register("images", { required: "This field is required." })}
                            type='file'
                            id="images"
                            name='images'
                            onChange={(e: any) => setImages(e.target.files)}
                            multiple
                            accept="image/png, image/jpeg"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-300">PNG or JPG</p>
                    </div>
                    <button>
                        <AiFillPlusCircle color='#1d4ed8' size={23} />
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default PostForm;