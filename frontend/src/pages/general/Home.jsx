import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [foods, setFoods] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/food`,
                    { withCredentials: true }
                )

                setFoods(response.data.foodItems)
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.message)
                } else {
                    setError('Something went wrong. Please try again.')
                }
            }
            finally {
                setLoading(false)
            }
        }

        fetchFoods()
    }, [])

    async function likeVideo(item){
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/like`, {
                foodId: item._id
            },{
                withCredentials: true
            });

            if(response.data.like){
                console.log("Video Liked");
                setFoods((prev) => prev.map((v) => v._id === item._id ? {...v, likesCount: v.likesCount + 1} : v))
            }
            else{
                console.log("Video Unliked");
                setFoods((prev) => prev.map((v) => v._id === item._id ? {...v, likesCount: v.likesCount - 1} : v))
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async function saveVideo(item){
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/save`, {
                foodId: item._id
            },{
                withCredentials: true
            });

            if(response.data.save){
                console.log("Video Saved");
                setFoods((prev) => prev.map((v) => v._id === item._id ? {...v, savesCount: v.savesCount + 1} : v))
            }
            else{
                console.log("Video Unsaved");
                setFoods((prev) => prev.map((v) => v._id === item._id ? {...v, savesCount: v.savesCount - 1} : v))
            }
        }
        catch(err){
            console.log(err);
        }
    }

    if (loading) {
        return (
            <div className="h-dvh bg-black flex items-center justify-center">
                <p className="text-white">Loading...</p>
            </div>
        )
    }

    return(
        <>
            <div className='flex justify-center items-center'>
                {error && (<p className="text-red-500 text-sm">{error}</p>)}
            </div>
            <ReelFeed items = {foods} onLike = {likeVideo} onSave = {saveVideo} emptyMessage = "No videos available" />
        </>
    )
}

export default Home;