import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => console.log(data);

    const inputStyle = useMemo(() => 'py-0.5 px-1 rounded focus:outline-none border focus:border-blue-200', []);

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='m-auto rounded bg-gray-50 flex justify-center items-center'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='my-5 mx-2 flex flex-col'
                >
                    

                    <div className='flex flex-col my-2'>
                        <label htmlFor='email' className='text-sm'>Email <span className='text-red-500'>*</span></label>
                        <input
                            {...register("email", { required: true, maxLength: 50 })}
                            className={inputStyle}
                            type="email"
                            id='email'
                            name='email'
                        />
                    </div>

                    <div className='flex flex-col my-2'>
                        <label htmlFor='confirmation' className='text-sm'>Password <span className='text-red-500'>*</span></label>
                        <input
                            {...register("password", { required: true })}
                            className={inputStyle}
                            type='password'
                            id='password'
                            name='password'
                        />
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