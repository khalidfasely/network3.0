import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../actions/register';
import { FormErrors, RegisterInputTypes } from '../types/forms';

const initialFormErrors = {
    email: undefined,
    password1: undefined,
    password2: undefined
}

const Register: React.FC = () => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterInputTypes>();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const navigate = useNavigate();

    const onSubmit = (data: any) => {

        registerApi(data)
        .then((res: any) => {
            if (res[1]) {
                //handle server errors
                console.log(res[1])
                if (res[1].response.data.non_field_errors) {
                    setError('root', {
                        type: 'server',
                        message: res[1].response.data.non_field_errors[0],
                    })
                } else {
                    const entry: any = Object.entries(res[1].response.data)[0];
                    setError(entry[0], {
                        type: 'server',
                        message: entry[1][0]
                    })
                }
                return
            }

            navigate('/login');
        });
    };

    const inputStyle = useMemo(() => 'py-0.5 px-1 rounded focus:outline-none border focus:border-blue-200', [])

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='m-auto rounded bg-gray-50 flex justify-center items-center'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='my-5 mx-2 flex flex-col'
                >
                    {errors.root ? <p className='text-red-400 text-xs text-center'>{errors.root.message}</p> : null}
                    <div className='flex flex-col my-2'>
                        <label htmlFor='email' className='text-sm'>Email <span className='text-red-500'>*</span></label>
                        <input
                            {...register('email', { required: "This field is required.", maxLength: {
                                value: 50,
                                message: "Password should not be more than 50 characters."
                            } })}
                            placeholder="Enter your Email"
                            type='email'
                            name='email'
                            id='email'
                            className={inputStyle}
                        />
                        {errors.email ? <p className='text-red-400 text-xs px-1'>{errors.email.message}</p> : null}
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor='password' className='text-sm'>Password <span className='text-red-500'>*</span></label>
                        <input
                            {...register("password1", { required: "This field is required." })}
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            name='password1'
                            id='password1'
                            className={inputStyle}
                        />
                        {errors.password1 ? <p className='text-red-400 text-xs px-1'>{errors.password1.message}</p> : null}
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
                            {...register("password2", { required: "This field is required." })}
                            placeholder='Password Again'
                            type={showConfirmation ? 'text' : 'password'}
                            name='password2'
                            id='password2'
                            className={inputStyle}
                        />
                        {errors.password2 ? <p className='text-red-400 text-xs px-1'>{errors.password2.message}</p> : null}
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