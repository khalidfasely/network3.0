import React, { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { PostInputTypes } from '../types/forms';
import { createPost, uploadImagesApi } from '../actions/post';
import { PostsContext } from '../pages/Home';
import { PostDataTypes } from '../types/post';

const PostForm: React.FC = () => {
    const [ images, setImages ] = useState<any>([]);

    const [ postImagesIDs, setPostImagesIDs ] = useState<number[]>([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostInputTypes>();

    const [ newPostModalOpen, setNewpostModalOpen ] = useState<boolean>(false);

    const { setPostsData } = useContext(PostsContext);

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
    }

    const uploadImages = (e: any) => {
        const formData = new FormData();

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('images', e.target.files[i]);

            setImages((prev: any) => [...prev, {image: URL.createObjectURL(e.target.files[i])}])
        }

        uploadImagesApi(formData)
        .then((res: any) => {
            setPostImagesIDs(res.data);
        })
        .catch((er: any) => {
            //handle errors
        });
    }

    const onSubmit = (data: any) => {
        createPost({...data, images: postImagesIDs})
        .then((res: any) => {
            reset();

            //setPostsData((prev: PostDataTypes) => ({...prev, results: [res[0], ...prev.results]}))
            setPostsData((prev: PostDataTypes) => ({...prev, results: [res.data, ...prev.results]}));
            setImages([]);
            setNewpostModalOpen(false);
        })
        .catch((er: any) => {
            //handle errors
        });
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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-[95%] m-auto overflow-hidden'
                >
                    <div>
                        <textarea
                            {...register("content", { required: "This field is required." })}
                            className='focus:outline-none mx-4 w-full mt-2'
                            placeholder="What's on your mind."
                        />
                        {errors.content ? <p className='text-red-500 text-sm font-light text-center'>{errors.content.message}</p> : null}
                    </div>
                    <div className='flex flex-col my-1'>
                        <label htmlFor='images' className='block text-sm font-medium text-gray-900 dark:text-white'>Add Images: </label>
                        <input
                            type='file'
                            id="images"
                            name='images'
                            onChange={uploadImages}
                            multiple
                            accept="image/png, image/jpeg"
                            className='overflow-hidden'
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-300">PNG or JPG</p>
                    </div>
                    <div className='flex justify-end mb-1'>
                        <button className='flex gap-1 items-center text-[#1d4ed8]'>
                            Post
                            <AiFillPlusCircle color='#1d4ed8' size={23} />
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default PostForm;