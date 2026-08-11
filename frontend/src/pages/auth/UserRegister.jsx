import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user/register`, {
                fullName: firstName + " " + lastName,
                email,
                password
            },{
                withCredentials: true
            })

            navigate('/');
            console.log(response.data);
        }
        catch(err){
            if (err.response) {
                setError(err.response.data.message);
            } 
            else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className='min-h-dvh flex justify-center items-center py-8 px-4 bg-radial from-slate-800 to-gray-950'>
            <div className='bg-linear-to-b from-sky-950 via-slate-900 to-gray-900 w-full max-w-md px-6 py-6 rounded-lg border-2 border-solid border-gray-700 shadow-xl shadow-black'>
                <header className='text-center'>
                    <h1 className='text-blue-100 text-2xl tracking-wide mb-1'>
                    User Sign Up
                    </h1>
                    <p className='text-slate-400 mb-1.5'>
                        Join to explore and enjoy delicious meals
                    </p>
                </header>

                <nav className='text-center text-m mt-0.5 text-slate-600'>
                    <strong className='font-semibold text-slate-300'>Switch:</strong>{' '}
                    <Link to='/user/register' className='text-blue-600'>
                        User
                    </Link>
                    <span className='text-slate-300 px-1'>•</span>
                    <Link to='/food-partner/register' className='text-blue-600'>
                        Food partner
                    </Link>
                </nav>

                <div className='flex justify-center items-center'>
                    {error && (<p className="text-red-500 text-sm">{error}</p>)}
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-2.5'>
                    <div className='flex gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="firstName" className='text-xs py-0.5 tracking-wider font-semibold text-slate-400'>FIRST NAME</label>
                            <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' type="text" id="firstName" name="firstName" required autoComplete='given-name' placeholder='Alice'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="lastName" className='text-xs py-0.5 tracking-wider font-semibold text-slate-400'>LAST NAME</label>
                            <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' type="text" id="lastName" name="lastName" required autoComplete='family-name' placeholder='Doe'/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs tracking-wider py-0.5 font-semibold text-slate-400' htmlFor="email">EMAIL</label>
                        <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' type="email" id="email" name='email' placeholder='you@example.com' required autoComplete='email' />
                    </div>
                    
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs tracking-wider py-0.5 font-semibold text-slate-400' htmlFor="password">PASSWORD</label>
                        <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' type="password" id="password" name='password' placeholder='••••••••' required autoComplete='new-password' />
                    </div>

                    <button className='mt-1 bg-blue-500 text-white border-none py-2.5 px-4 font-semibold rounded-sm cursor-pointer tracking-wide inline-flex items-center justify-center gap-1.5' type='submit'>Sign Up</button>
                </form>

                <div className='text-center mt-4 text-slate-400'>
                    Already have an account?
                    <Link className='text-blue-500' to='/user/login'>{' '}Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
