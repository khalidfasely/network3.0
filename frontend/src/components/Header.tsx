import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/auth';

const Header: React.FC = () => {
    
    const { email } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className='flex justify-between items-center mx-2 h-12'>
            <Link to='/'><h1>Auth</h1></Link>
            <div className="flex">
                {
                    email ?
                    <>
                        <div className='mx-1 text-[#222]'>Hello, <span className='font-bold'>{email}</span></div>
                        <button onClick={handleLogout} className='mx-1 bg-red-400 ease rounded py-0.5 px-1 duration-300 hover:bg-red-600 text-[#eee]'>Logout</button>
                    </> :
                    <>
                        <div className='mx-1'>
                            <Link to='/login'>Login</Link>
                        </div>
                        <div className='mx-1'>
                            <Link to='/register'>Register</Link>
                        </div>
                    </>
                }
            </div>
        </nav>
    )
}

export default Header;