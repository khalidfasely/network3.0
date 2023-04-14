import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../actions/getPosts';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { Post } from '../types/post';

interface PostsContextType {
  posts: Post[],
  setPosts: (value: Post[] | ((prevVar: Post[]) => Post[])) => void,
  nextPosts: string | null,
  setNextPosts: (value: string | null | ((prevVar: string | null) => string | null)) => void,
}

export const PostsContext = createContext<PostsContextType>({
  posts: [],
  setPosts: () => {},
  nextPosts: null,
  setNextPosts: () => {}
})

const Home: React.FC = () => {
    const [ posts, setPosts ] = useState<Post[]>([]);
    const [ nextPosts, setNextPosts ] = useState<string | null>(null); 

    const { email } = useSelector((state: any) => state.auth);

    useEffect(() => {
      getPosts()
      .then((res: any) => {
        if (res[1]) {
          //handle errors
          return
        }

        setPosts(res[0].results);
        setNextPosts(res[0].next);
      });
    }, [])

    return (
        <div className='min-h-screen bg-gray-100 pt-5'>
          <div className='lg:w-[40%] sm:w-[65%] w-[85%] m-auto'>
            <PostsContext.Provider value={{ posts, setPosts, nextPosts, setNextPosts }}>
              {
                email ?
                <PostForm /> :
                null
              }
              {
                posts.length !== 0 ?
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