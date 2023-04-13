import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav className='flex justify-between items-center mx-2 h-12'>
            <Link to='/'><h1>Auth</h1></Link>
            <div className="flex">
                <div className='mx-1'>
                    <Link to='/login'>Login</Link>
                </div>
                <div className='mx-1'>
                    <Link to='/register'>Register</Link>
                </div>
            </div>
        </nav>
    )
}

export default Header;