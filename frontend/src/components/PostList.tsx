import React, { useContext } from 'react';
import { BsThreeDotsVertical, BsShareFill } from 'react-icons/bs';
import { AiOutlineLike, AiOutlineRetweet } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import moment from 'moment';

import user from '../images/user.jpg';
import Comments from './Comments';
import { PostsContext } from '../pages/Home';
import { getPosts } from '../actions/post';
import { PostDataTypes } from '../types/post';
import PostImages from './PostImages';

const PostList: React.FC = () => {

    const { postsData, setPostsData } = useContext(PostsContext);

    const handleLoadMorePosts = () => {
        getPosts(postsData.next)
        .then((res: any) => {
            setPostsData((prev: PostDataTypes) => ({...res.data, results: [...prev.results, ...res.data.results]}));
        }).catch((e)=>{
            alert("error");
        })
    }

    return (
            <>
                {
                    postsData.results.map((post, idx) => (
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
                                        <span className='text-xs text-gray-400'>{moment(post.date).fromNow()}</span>
                                        <div className='bg-gray-200 rounded-full p-1'>
                                            <BsThreeDotsVertical color='gray' size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/*Content */}
                                <div className='max-w-[40rem]'>
                                    <p className='text-sm my-2 font-light break-words'>
                                        {post.content}
                                    </p>
                                </div>

                                <PostImages images={post.images} />
                                
                                <div className='flex justify-between w-[90%] m-auto text-sm text-gray-500 mt-4'>
                                    <div className='flex items-center gap-1.5'>
                                        <AiOutlineLike color='gray' size={20} />
                                        <span>25k</span>
                                    </div>
                                    <div className='flex items-center gap-1.5'>
                                        <BiComment color='gray' size={18} />
                                        <span>{post.comments}</span>
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
                {
                    postsData.next ?
                    <div className='flex justify-center pb-8'>
                        <button
                            onClick={handleLoadMorePosts}
                            className='bg-blue-400 ease duration-100 hover:bg-blue-500 rounded-lg text-[#eee] py-1 px-2'
                        >Load More</button>
                    </div> :
                    null
                }
            </>
    )
}

export default PostList;