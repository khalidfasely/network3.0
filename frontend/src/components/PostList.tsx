import React from 'react';
import { BsThreeDotsVertical, BsShareFill } from 'react-icons/bs';
import { AiOutlineLike, AiOutlineRetweet } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';

import user from '../images/user.jpg';
import postImage from '../images/post1.png';
import { Post } from '../types/post';
import Comments from './Comments';

interface Props {
    posts: Post[]
}

const PostList: React.FC<Props> = ({ posts }) => {

    return (
        <div className='mt-10'>
            <div className='rounded-xl bg-white shadow-md shadow-slate-100 flex p-4 my-2'>
                <div className='w-14'>{/* rounded-full overflow-hidden */}
                    <img src={user} alt="user's image" className='rounded-full' />
                </div>
                <div className='ml-3 w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <h4 className='text-sm'>Shay Jordon</h4>
                            <span className='text-xs text-gray-500'>@shay-jordon</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xs text-gray-400'>19 Feb</span>
                            <div className='bg-gray-200 rounded-full p-1'>
                                <BsThreeDotsVertical color='gray' size={18} />
                            </div>
                        </div>
                    </div>

                    {/*Content */}
                    <div>
                        <p className='text-sm my-2 font-light'>
                            Welcome to the Vogel family 🙂

                            1. Follow people you like by clicking on the + Follow button to see their posts in your feed.
                            2. Share your thoughts with others and gain a following.

                            Happy Vogel to you!
                        </p>
                    </div>

                    <div>
                        <img src={postImage} alt="post's image" className='rounded-lg' />
                    </div>
                    
                    <div className='flex justify-between w-[90%] m-auto text-sm text-gray-500 mt-4'>
                        <div className='flex items-center gap-1.5'>
                            <AiOutlineLike color='gray' size={20} />
                            <span>25k</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <BiComment color='gray' size={18} />
                            <span>32</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <AiOutlineRetweet color='gray' size={20} />
                            <span>4.5k</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <BsShareFill color='gray' size={18} />
                            <span>500</span>
                        </div>
                    </div>

                    {/*Comments */}
                    <Comments />
                </div>
            </div>


            <div className='rounded-xl bg-white shadow-md shadow-slate-100 flex p-4 my-2'>
                <div className='w-14'>{/* rounded-full overflow-hidden */}
                    <img src={user} alt="user's image" className='rounded-full' />
                </div>
                <div className='ml-3 w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <h4 className='text-sm'>Shay Jordon</h4>
                            <span className='text-xs text-gray-500'>@shay-jordon</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xs text-gray-400'>19 Feb</span>
                            <div className='bg-gray-200 rounded-full p-1'>
                                <BsThreeDotsVertical color='gray' size={18} />
                            </div>
                        </div>
                    </div>

                    {/*Content */}
                    <div>
                        <p className='text-sm my-2 font-light'>
                            Welcome to the Vogel family 🙂

                            1. Follow people you like by clicking on the ’+ Follow’ button to see their posts in your feed.
                            2. Share your thoughts with others and gain a following.

                            Happy Vogel to you!
                        </p>
                    </div>

                    <div>
                        <img src={postImage} alt="post's image" className='rounded-lg' />
                    </div>
                    
                    <div className='flex justify-between w-[90%] m-auto text-sm text-gray-500 mt-4'>
                        <div className='flex items-center gap-1.5'>
                            <AiOutlineLike color='gray' size={20} />
                            <span>25k</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <BiComment color='gray' size={18} />
                            <span>32</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <AiOutlineRetweet color='gray' size={20} />
                            <span>4.5k</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <BsShareFill color='gray' size={18} />
                            <span>500</span>
                        </div>
                    </div>

                    {/*Comments */}
                    <Comments />
                </div>
            </div>



            {
                posts.map((post, idx) => (
                    <div key={idx} className='rounded-xl bg-white shadow-md shadow-slate-100 flex p-4 my-2'>
                        <div className='w-14'>{/* rounded-full overflow-hidden */}
                            <img src={user} alt="user's image" className='rounded-full' />
                        </div>
                        <div className='ml-3 w-full'>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <h4 className='text-sm'>{post.user.username}</h4>
                                    <span className='text-xs text-gray-500'>{post.user.email}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-xs text-gray-400'>{new Date(post.date).toLocaleString('en-US', {dateStyle: 'medium'})}</span>
                                    <div className='bg-gray-200 rounded-full p-1'>
                                        <BsThreeDotsVertical color='gray' size={18} />
                                    </div>
                                </div>
                            </div>

                            {/*Content */}
                            <div>
                                <p className='text-sm my-2 font-light'>
                                    {post.content}
                                </p>
                            </div>

                            <div>
                                <img src={"http://127.0.0.1:8000" + post.images[0].image} alt="post's image" className='rounded-lg' />
                            </div>
                            
                            <div className='flex justify-between w-[90%] m-auto text-sm text-gray-500 mt-4'>
                                <div className='flex items-center gap-1.5'>
                                    <AiOutlineLike color='gray' size={20} />
                                    <span>25k</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <BiComment color='gray' size={18} />
                                    <span>32</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <AiOutlineRetweet color='gray' size={20} />
                                    <span>4.5k</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <BsShareFill color='gray' size={18} />
                                    <span>500</span>
                                </div>
                            </div>

                            {/*Comments */}
                            <Comments postId={post.id} />
                        </div>
                    </div>
                ))
            }



        </div>
    )
}

export default PostList;