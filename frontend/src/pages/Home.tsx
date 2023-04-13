import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../actions/getPosts';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { Post } from '../types/post';

const Home: React.FC = () => {
  const [ posts, setPosts ] = useState<Post[]>([]);

    const { email } = useSelector((state: any) => state.auth);

    useEffect(() => {
      getPosts()
      .then((res: any) => {
        if (res[1]) {
          //handle errors
          return
        }

        console.log(res[0]);
        setPosts(res[0].results)
      });
    }, [])

    return (
        <div className='min-h-screen bg-gray-100 pt-5'>
          <div className='lg:w-[40%] sm:w-[65%] w-[85%] m-auto'>
            {
              email ?
              <PostForm /> :
              null
            }
            <PostList posts={posts} />
          </div>
        </div>
    )
}

export default Home;