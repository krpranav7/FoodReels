import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoginRequired from './LoginRequired'

const ProtectedRoute = ({ children }) => {

    const [authStatus, setAuthStatus] = useState('checking')

    useEffect(() => {

        const checkAuthentication = async () => {
            try {
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/user/me`,
                    {
                        withCredentials: true
                    }
                )

                setAuthStatus('authenticated')

            } catch (error) {
                setAuthStatus('unauthenticated')
            }
        }

        checkAuthentication()

    }, [])

    // We don't know the authentication status yet
    if (authStatus === 'checking') {
        return (
            <div className="h-dvh bg-black flex items-center justify-center">
                <p className="text-white">
                    Loading...
                </p>
            </div>
        )
    }

    // Authentication check finished and user is not logged in
    if (authStatus === 'unauthenticated') {
        return <LoginRequired />
    }

    // User is authenticated
    return children
}

export default ProtectedRoute