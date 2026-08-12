import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food-partner/${id}`,
          { withCredentials: true }
        )

        setProfile(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems)
      } catch (error) {
        console.error('Failed to fetch food partner profile:', error)
      }
    }

    fetchProfile()
  }, [id])

  useEffect(() => {
    const handleOutsideClick = (e) => {
        if (!e.target.closest('[data-menu]')) {
            setMenuOpen(false)
        }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
        document.removeEventListener('click', handleOutsideClick)
    }
  }, [menuOpen])

  const handleLogout = async () => {
    try {
        await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/food-partner/logout`,
            {
                withCredentials: true
            }
        )

        setMenuOpen(false)
        navigate('/food-partner/login')

    } catch (error) {
        console.error('Logout failed:', error)
    }
  }

  return (
    <main className='max-w-180 mx-auto px-6 pt-6 pb-8 flex flex-col gap-6 min-h-dvh bg-slate-900 text-slate-100'>
      <section className='relative bg-slate-800 border border-slate-700 rounded-lg shadow-md p-6 flex flex-col gap-6'>

        {/* Three-dot menu */}
        <div
            data-menu
            className='absolute top-4 right-4 z-50'
        >
            <button
                type='button'
                onClick={() => setMenuOpen(!menuOpen)}
                className='w-10 h-10 rounded-full flex items-center justify-center text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer'
                aria-label='Open menu'
            >
                <svg
                    width='22'
                    height='22'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                >
                    <circle cx='12' cy='5' r='1.5' />
                    <circle cx='12' cy='12' r='1.5' />
                    <circle cx='12' cy='19' r='1.5' />
                </svg>
            </button>

            {menuOpen && (
                <div className='absolute right-0 mt-2 w-32 overflow-hidden rounded-lg bg-white shadow-lg'>
                    <button
                        type='button'
                        onClick={handleLogout}
                        className='w-full px-4 py-3 text-left text-sm font-semibold text-black hover:bg-slate-300 transition-colors duration-200 cursor-pointer'
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>

        <div className='grid grid-cols-[120px_1fr] items-center gap-6 max-[900px]:grid-cols-[96px_1fr] max-[420px]:grid-cols-[72px_1fr]'>
          <img
            className='w-30 h-30 rounded-full object-cover bg-slate-700 border-2 border-slate-700 max-[900px]:w-24 max-[900px]:h-24 max-[420px]:w-18 max-[420px]:h-18'
            src='https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />

          <div className='grid gap-3'>
            <h1
              className='inline-flex items-center rounded-xl px-3.5 py-2.5 border border-slate-700 bg-[#24324a] text-slate-100 w-fit shadow-md text-xl font-bold'
              title='Business name'
            >
              {profile?.businessName}
            </h1>

            <p
              className='inline-flex items-center rounded-xl px-3.5 py-2.5 border border-slate-700 bg-[#24324a] text-slate-400 w-fit shadow-md text-[1.05rem]'
              title='Address'
            >
              {profile?.address}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 border-t border-dashed border-slate-700 pt-6'>
          <div className='grid justify-items-center gap-2'>
            <span className='text-[1.15rem] text-slate-400 max-[420px]:text-base'>
              total meals
            </span>

            <span className='text-[2rem] font-extrabold max-[420px]:text-2xl'>
              {videos.length}
            </span>
          </div>
        </div>
      </section>

      <hr className='h-px border-0 bg-slate-700' />

      <section className='grid grid-cols-3' aria-label='Videos'>
        {videos.map(v => (
          <div key={v._id} className='aspect-3/4 overflow-hidden'>
            <video
              className='w-full h-full object-cover bg-slate-800'
              src={v.video}
              muted
            />
          </div>
        ))}
      </section>
    </main>
  )
}

export default Profile
