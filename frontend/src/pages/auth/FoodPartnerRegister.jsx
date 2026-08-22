import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const FoodPartnerRegister = () => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const isUserActive = location.pathname === '/user/register';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const businessName = e.target.businessName.value;
        const contactName = e.target.contactName.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const address = e.target.address.value;

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/food-partner/register`, {
                businessName,
                contactName,
                phone,
                email,
                password,
                address
            },{
                withCredentials: true
            })

            navigate('/create-food');
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
    }

    return (
        <div className='min-h-dvh flex justify-center items-center py-8 px-4 bg-radial from-slate-800 to-gray-950'>
            <div className='bg-linear-to-b from-sky-950 via-slate-900 to-gray-900 w-full max-w-md px-6 py-6 rounded-lg border-2 border-solid border-gray-700 shadow-xl shadow-black'>
                <header className='text-center'>
                    <h1 className='flex items-center justify-center text-blue-100 text-2xl tracking-wide mb-1'>
                        <img src="/favicon.png" alt="" className="inline-block w-5.5 h-5.5 mr-1.5 pb- align-middle"/>
                        Food Partner Sign Up
                    </h1>
                    <p className='text-slate-400 mb-1.5'>
                        Grow Your Business With Our Platform
                    </p>
                </header>

                <nav className='flex justify-center mt-0.5'>
                    <div className='inline-flex rounded-full border border-slate-600 bg-slate-800 p-1'>
                        <Link className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${isUserActive ? 'bg-blue-500 text-white' : 'text-blue-400 hover:text-blue-300'}`} to='/user/register'>
                            User
                        </Link>

                        <Link className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${!isUserActive ? 'bg-blue-500 text-white' : 'text-blue-400 hover:text-blue-300'}`} to='/food-partner/register'>
                            Food Partner
                        </Link>                        
                    </div>
                </nav>

                <div className='flex justify-center items-center'>
                    {error && (<p className="text-red-500 text-sm">{error}</p>)}
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-2.5'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs tracking-wider py-0.5 font-semibold text-slate-400' htmlFor="businessName">BUSINESS NAME</label>
                        <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' id="businessName" name='businessName' placeholder='Crunchy Roll' required autoComplete='organisation' />
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="contactName" className='text-xs py-0.5 tracking-wider font-semibold text-slate-400'>CONTACT NAME</label>
                            <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' id="contactName" name="contactName" required autoComplete='name' placeholder='Steve'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="phone" className='text-xs py-0.5 tracking-wider font-semibold text-slate-400'>PHONE</label>
                            <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' type="text" id="phone" name="phone" required autoComplete='tel' placeholder='+91 XXX YYY XXXX'/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs tracking-wider py-0.5 font-semibold text-slate-400' htmlFor="email">EMAIL</label>
                        <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' type="email" id="email" name='email' placeholder='you@example.com' required autoComplete='email' />
                    </div>
                    
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs tracking-wider py-0.5 font-semibold text-slate-400' htmlFor="password">PASSWORD</label>

                        <div className='relative'>
                            <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' type={showPassword ? 'text' : 'password'} id="password" name='password' placeholder='••••••••' required autoComplete='new-password' />

                            <button
                                type='button'
                                onClick={() => setShowPassword(prev => !prev)}
                                className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 hover:scale-105 transition-all duration-200 cursor-pointer'
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    // Eye-off icon
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M3 3l18 18' />
                                        <path d='M10.6 10.6a2 2 0 0 0 2.8 2.8' />
                                        <path d='M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.7 4 10 8a11.8 11.8 0 0 1-2.1 3.7' />
                                        <path d='M6.6 6.6C4.6 8 3.3 10 2 12c1.3 4 5 8 10 8 1.2 0 2.3-.2 3.3-.6' />
                                    </svg>
                                ) : (
                                    // Eye icon
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z' />
                                        <circle cx='12' cy='12' r='3' />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs tracking-wider py-0.5 font-semibold text-slate-400' htmlFor="address">ADDRESS</label>
                        <input className='border-2 border-solid border-slate-600 bg-slate-700 py-2 px-2 w-full rounded-sm text-slate-100 outline-none min-w-0' id="address" name='address' placeholder='Sunrise Apartments, MG Road' required autoComplete='street-address' />
                        <p className='text-slate-500 text-sm'>Full address helps customer find you faster</p>
                    </div>

                    <button className='mt-1 bg-blue-500 text-white border-none py-2.5 px-4 font-semibold rounded-sm cursor-pointer tracking-wide inline-flex items-center justify-center gap-1.5 hover:bg-blue-600 hover:scale-[1.03] transition-all duration-200' type='submit'>Sign Up</button>
                </form>

                <div className='text-center mt-4 text-slate-400'>
                    Already a partner?
                    <Link className='text-blue-600 hover:text-blue-400 transition-colors duration-200' to='/food-partner/login'>{' '}Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default FoodPartnerRegister;