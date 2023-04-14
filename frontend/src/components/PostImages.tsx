import React, { useState } from 'react';
import Modal from 'react-modal';

import { Image } from '../types/post';
import ImageSlider from './ImageSlider';

interface Props {
    images: Image[]
}

const PostImages: React.FC<Props> = ({ images }) => {

    const [ imagesModalOpen, setImagsModalOpen ] = useState<boolean>(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: '0',
            marginTop: '2rem',
            transform: 'translate(-50%, -50%)',
            minWidth: '20rem',
            //minHeight: '25rem',
            maxWidth: '28rem',
            background: '#eee'
        },
    };
    
    if (images.length === 1) {
        return <img src={"http://127.0.0.1:8000" + images[0].image} alt="post's image" className='rounded-lg' />
    }

    if (images.length === 2) {
        return (
            <div className='flex gap-0.5 w-[100%]'>
                <img src={"http://127.0.0.1:8000" + images[0].image} alt="post's image" className='w-[50%] rounded-lg rounded-r-none' />
                <img src={"http://127.0.0.1:8000" + images[1].image} alt="post's image" className='w-[50%] rounded-lg rounded-l-none' />
            </div>
        )
    }

    if (images.length === 3) {
        return (
            <div className='flex gap-0.5 w-[100%]'>
                <img src={"http://127.0.0.1:8000" + images[0].image} alt="post's image" className='w-[50%] object-cover rounded-lg rounded-r-none' />
                <div className=' flex flex-col gap-0.5 w-[50%]'>
                    <img src={"http://127.0.0.1:8000" + images[1].image} alt="post's image" className='rounded-tr-lg' />
                    <img src={"http://127.0.0.1:8000" + images[2].image} alt="post's image" className='rounded-br-lg' />
                </div>
            </div>
        )
    }

    if (images.length >= 4) {
        return (
            <>
                <div className='grid grid-cols-2 gap-0.5'>
                    <img src={"http://127.0.0.1:8000" + images[0].image} alt="post's image" className='rounded-tl-lg' />
                    <img src={"http://127.0.0.1:8000" + images[1].image} alt="post's image" className='rounded-tr-lg' />
                    <img src={"http://127.0.0.1:8000" + images[2].image} alt="post's image" className='rounded-bl-lg' />
                    <img src={"http://127.0.0.1:8000" + images[3].image} alt="post's image" className='rounded-br-lg' />
                </div>
                {
                    images.length > 4 ?
                    <div className='flex justify-end'>
                        <button
                            className='text-xs my-0.5 text-blue-800'
                            onClick={() => setImagsModalOpen(true)}
                        >
                            +
                            <span>{images.length - 4}</span> more
                        </button>
                        <Modal
                            isOpen={imagesModalOpen}
                            ariaHideApp={false}
                            onRequestClose={() => setImagsModalOpen(false)}
                            style={customStyles}
                        >
                            <ImageSlider images={images} />
                        </Modal>
                    </div> :
                    null
                }
            </>
        )
    }

    return null;
}

export default PostImages;