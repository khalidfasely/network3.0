import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../actions/register';
import { FormErrors } from '../types/forms';

const initialFormErrors = {
    email: undefined,
    password1: undefined,
    password2: undefined
}

const Register: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState<string>('');
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmitForm = (e: any) => {
        e.preventDefault();

        setError('');
        setFormErrors(initialFormErrors);

        registerApi({email, password1: password, password2: confirmation})
        .then((res: any) => {
            if (res[1]) {
                //error
                if (res[1].response?.data?.email) {
                    setFormErrors((prev: FormErrors) => ({...prev, email: res[1].response?.data?.email[0]}))
                }
                if (res[1].response?.data?.password1) {
                    setFormErrors((prev: FormErrors) => ({...prev, password1: res[1].response?.data?.password1[0]}))
                }
                if (res[1].response?.data?.password2) {
                    setFormErrors((prev: FormErrors) => ({...prev, password2: res[1].response?.data?.password2[0]}))
                }
                
                setError(res[1].response ? res[1].response?.data?.non_field_errors : '');
                return
            }

            navigate('/');
        });
    }

    const inputStyle = useMemo(() => 'py-0.5 px-1 rounded focus:outline-none border focus:border-blue-200', [])

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='m-auto rounded bg-gray-50 flex justify-center items-center'>
                <form
                    onSubmit={handleSubmitForm}
                    className='my-5 mx-2 flex flex-col'
                >
                    {error ? <p className='text-red-400 text-center'>{error}</p> : null}
                    <div className='flex flex-col my-2'>
                        <label htmlFor='email' className='text-sm'>Email <span className='text-red-500'>*</span></label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Enter your Email"
                            type='email'
                            name='email'
                            id='email'
                            className={inputStyle}
                        />
                        {formErrors.email ? <p className='text-red-400 text-xs px-1'>{formErrors.email}</p> : null}
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor='password' className='text-sm'>Password <span className='text-red-500'>*</span></label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            id='password'
                            className={inputStyle}
                        />
                        {formErrors.password1 ? <p className='text-red-400 text-xs px-1'>{formErrors.password1}</p> : null}
                        <button
                            type='button'
                            onClick={() => setShowPassword((prev: boolean) => !prev)}
                            className='self-end text-xs text-blue-500'
                        >
                            {showPassword ? 'Hide Password' : 'Show Password'}
                        </button>
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor='confirmation' className='text-sm'>Confirmation <span className='text-red-500'>*</span></label>
                        <input
                            onChange={(e) => setConfirmation(e.target.value)}
                            value={confirmation}
                            placeholder='Password Again'
                            type={showConfirmation ? 'text' : 'password'}
                            name='confirmation'
                            id='confirmation'
                            className={inputStyle}
                        />
                        {formErrors.password2 ? <p className='text-red-400 text-xs px-1'>{formErrors.password2}</p> : null}
                        <button
                            type='button'
                            onClick={() => setShowConfirmation((prev: boolean) => !prev)}
                            className='self-end text-xs text-blue-500'
                        >
                            {showConfirmation ? 'Hide Confirmation' : 'Show Confirmation'}
                        </button>
                    </div>

                    <button
                        className='self-end my-2 rounded bg-blue-300 ease duration-200 hover:bg-blue-400 py-0.5 px-1'
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;