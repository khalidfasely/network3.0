import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';
import Modal from 'react-modal';

const PostForm: React.FC = () => {

    const [ newPostModalOpen, setNewpostModalOpen ] = useState<boolean>(false);

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

    return (
        <div className='w-[100%] shadow-md shadow-slate-100 rounded-xl py-3 px-5 bg-white flex items-center'>
            <div>
                <FaUserCircle color='#1d4ed8' size={23}/>
            </div>
            <div className='w-[95%]'>
                <form>
                    <input
                        onClick={() => {
                            console.log('Opened')
                            setNewpostModalOpen(true)
                        }}

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