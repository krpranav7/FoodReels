import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [videoFile, setVideoFile] = useState(null)
    const [videoURL, setVideoURL] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    // Create preview URL when a video is selected
    useEffect(() => {
        if (!videoFile) {
            setVideoURL('')
            return
        }

        // console.log(videoFile);

        const url = URL.createObjectURL(videoFile)
        setVideoURL(url)

        return () => URL.revokeObjectURL(url)
    }, [videoFile])

    const handleVideoChange = (e) => {
        // console.log(e.target.files);

        const file = e.target.files[0]

        if (!file) return;

        if (!file.type.startsWith('video/')) {
            setError('Please select a valid video file.')
            setVideoFile(null)
            return
        }

        setError('')
        setVideoFile(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim() || !videoFile) { // if user enters "  " -> "", trim removes space & becomes true
            setError('Food name and video are required.')
            return
        }

        try {
            setLoading(true)
            setError('')

            const formData = new FormData()

            formData.append('name', name)
            formData.append('description', description)
            formData.append('video', videoFile)

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/food`,
                formData,
                {
                    withCredentials: true
                }
            )

            navigate(
                `/food-partner/${response.data.food.foodPartner}`
            )

        } catch (error) {
            console.error('Failed to create food:', error)

            setError(
                error.response?.data?.message ||
                'Failed to create food. Please try again.'
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-dvh bg-slate-950 text-slate-100 flex justify-center px-4 py-6">
            <div className="w-full max-w-180 bg-slate-800 border border-slate-700 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-2">
                    Create Food
                </h1>

                <p className="text-slate-400 mb-6">
                    Upload a video and add information about your food.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Video */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-400">
                            Food Video
                        </label>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="hidden"
                        />

                        {!videoFile && (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="border border-dashed border-slate-600 rounded-md p-8 text-slate-400 hover:border-blue-500 hover:text-blue-400"
                            >
                                Click to select a video
                            </button>
                        )}

                        {videoFile && (
                            <>
                                <video
                                    src={videoURL}
                                    controls
                                    className="w-full max-h-100 rounded-md bg-black object-contain"
                                />

                                <div className="flex items-center justify-between bg-slate-700 rounded-md p-3">

                                    <span className="text-sm truncate">
                                        {videoFile.name}
                                    </span>

                                    <div className="flex gap-2">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current.click()
                                            }
                                            className="text-blue-400 font-bold"
                                        >
                                            Change
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setVideoFile(null)
                                                setError('')
                                            }}
                                            className="text-red-400 font-bold"
                                        >
                                            Remove
                                        </button>

                                    </div>
                                </div>
                            </>
                        )}

                        {error && (
                            <p className="text-red-400 text-sm">
                                {error}
                            </p>
                        )}

                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="foodName"
                            className="text-sm font-bold text-slate-400"
                        >
                            Name
                        </label>

                        <input
                            id="foodName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Spicy Paneer Wrap"
                            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                            required
                        />

                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="description"
                            className="text-sm font-bold text-slate-400"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the food..."
                            rows="4"
                            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 outline-none resize-y focus:border-blue-500"
                        />

                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !name.trim() || !videoFile}
                        className="bg-blue-500 text-white font-bold rounded-md px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
                    >
                        {loading ? 'Saving...' : 'Save Food'}
                    </button>

                </form>
            </div>
        </main>
    )
}

export default CreateFood