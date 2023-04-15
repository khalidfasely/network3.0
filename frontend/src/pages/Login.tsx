import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../actions/user';
import { loginApi } from '../actions/user';
import { login } from '../reducers/auth';
import { LoginInputTypes } from '../types/forms';


const Login: React.FC = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginInputTypes>();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onSubmit = (data: any) => {
        loginApi(data)
        .then((res: any) => {

            // get user after login successfully
            getUser()
            .then((res: any) => {
                dispatch(login(res.data));
            })
            .catch((er: any) => {
                //handle errors
            })

            navigate('/');
        })
        .catch((er: any) => {
            if (er.response.data.non_field_errors) {
                setError('root', {
                    type: 'server',
                    message: er.response.data.non_field_errors[0],
                })
            } else {
                const entry: any = Object.entries(er.response.data)[0];
                setError(entry[0], {
                    type: 'server',
                    message: entry[1][0]
                })
            }
        })
    };

    const inputStyle = useMemo(() => 'py-0.5 px-1 rounded focus:outline-none border focus:border-blue-200', []);

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
                            {...register("email", { required: "This field is required.", maxLength: {
                                value: 50,
                                message: "Password should not be more than 50 characters."
                            } })}
                            placeholder="Enter your Email"
                            className={inputStyle}
                            type="email"
                            id='email'
                            name='email'
                        />
                        {errors.email ? <p className='text-red-400 text-xs'>{errors.email.message}</p> : null}
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor='confirmation' className='text-sm'>Password <span className='text-red-500'>*</span></label>
                        <input
                            {...register("password", { required: "This field is required." })}
                            className={inputStyle}
                            placeholder="Enter your Password"
                            type='password'
                            id='password'
                            name='password'
                        />
                        {errors.password ? <p className='text-red-400 text-xs'>{errors.password.message}</p> : null}
                    </div>

                    <button
                        className='self-end my-2 rounded bg-blue-300 ease duration-200 hover:bg-blue-400 py-0.5 px-1'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;