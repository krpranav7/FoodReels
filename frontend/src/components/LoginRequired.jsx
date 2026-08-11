import React from 'react'
import { Link } from 'react-router-dom'

const LoginRequired = () => {
    return (
        <div className="h-dvh bg-black flex items-center justify-center px-6">

            <div className="w-full max-w-sm text-center text-white">

                <h1 className="text-2xl font-bold mb-2">
                    Login required
                </h1>

                <p className="text-slate-400 mb-6">
                    Please login to continue.
                </p>

                <div className="flex flex-col gap-3">

                    <Link
                        to="/user/login"
                        className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white no-underline"
                    >
                        Login as User
                    </Link>

                    {/* <Link
                        to="/food-partner/login"
                        className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white no-underline"
                    >
                        Login as Food Partner
                    </Link> */}

                </div>

            </div>

        </div>
    )
}

export default LoginRequired