import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSavedFoods = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/food/save`,
                    { withCredentials: true }
                )

                const savedFoods = response.data.savedFoods.filter((item) => item.food).map((item) => ({ // sakip saves pointing to deleted food docs
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likesCount: item.food.likesCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))

                setVideos(savedFoods)

            } catch (error) {
                console.error("Failed to fetch saved foods:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSavedFoods()
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/food/save`,
                { foodId: item._id },
                { withCredentials: true }
            )

            setVideos((prev) =>
                prev.filter((video) => video._id !== item._id)
            )

        } catch (error) {
            console.error("Failed to remove saved food:", error)
        }
    }

    if (loading) {
        return (
            <div className="h-dvh bg-black flex items-center justify-center">
                <p className="text-white">Loading...</p>
            </div>
        )
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved