import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../actions/post';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { Post, PostDataTypes } from '../types/post';

interface PostsContextType {
  postsData: PostDataTypes,
  setPostsData: (value: PostDataTypes | ((prevVar: PostDataTypes) => PostDataTypes)) => void,
}

export const PostsContext = createContext<PostsContextType>({
  postsData: {
    count: "0",
    next: null,
    previous: null,
    results: []
  },
  setPostsData: () => {},
})

const Home: React.FC = () => {
    const [ postsData, setPostsData ] = useState<PostDataTypes>({
      next: null,
      previous: null,
      results: [],
      count: '0'
    });

    const { email } = useSelector((state: any) => state.auth);

    useEffect(() => {
      getPosts()
      .then((res: any) => {
        setPostsData(res.data);
      }).catch((er) => {
        //handle error
      });
    }, [])

    return (
        <div className='min-h-screen bg-gray-100 pt-5'>
          <div className='lg:w-[40%] sm:w-[65%] w-[85%] m-auto'>
            <PostsContext.Provider value={{ postsData, setPostsData }}>
              {
                email ?
                <PostForm /> :
                null
              }
              {
                postsData.results.length !== 0 ?
                <PostList /> :
                <div className='mt-4 rounded-xl bg-white border py-2 px-5 flex justify-center'>
                  No Posts! Add One.
                </div>
              }
            </PostsContext.Provider>
          </div>
        </div>
    )
}

export default Home;