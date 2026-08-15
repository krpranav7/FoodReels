import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ReelFeed = ({items = [], onLike, onSave, emptyMessage = 'No videos yet'}) => {
    const videoRefs = useRef(new Map());
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const [activeCommentsFoodId, setActiveCommentsFoodId] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const handleOutsideClick = (e) => {
            // If the click was not inside the menu,
            // close the menu.
            if (!e.target.closest('[data-menu]')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [menuOpen]);

    useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target
                    if(!(video instanceof HTMLVideoElement)) return;
                    if(entry.isIntersecting && entry.intersectionRatio >= 0.6){
                        video.play().catch( () =>{} );
                    }
                    else video.pause();
                })
            },
            {threshold: [0, 0.25, 0.6, 0.9, 1]}
        )

        videoRefs.current.forEach((vid) => observer.observe(vid));

        return () => observer.disconnect();
    }, [items])

    function setVideoRef(id){
        return function(el){
            if(!el) {
                videoRefs.current.delete(id);
                return;
            }
            videoRefs.current.set(id, el);
        }   
    }

    const handleLogout = async () => {

        try {
            await axios.get(
                `${import.meta.env.VITE_API_URL}/api/auth/user/logout`,
                {
                    withCredentials: true
                }
            );
            setMenuOpen(false);
            navigate('/user/login');

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const openComments = async (foodId) => {
        setActiveCommentsFoodId(foodId);
        setCommentsLoading(true);

        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/comment/${foodId}`, {
                withCredentials: true
            });

            setComments(response.data.comments);
        }   
        catch(err){
            console.error('Failed to fetch comments: ', err);
            setComments([]);
        }
        finally{
            setCommentsLoading(false);
        }
    }

    const closeComments = () => {
        setActiveCommentsFoodId(null);
        setComments([]);
        setNewComment("");
    }

    const submitComment = async () => {
        if(!newComment.trim()) return;

        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/comment`, {
                foodId: activeCommentsFoodId, text: newComment
            }, {
                withCredentials: true
            });

            setComments((prev) => [response.data.comment, ...prev]);
            setNewComment("");
        }   
        catch(err){
            console.error('Failed to post comment: ', err);
        }
    }

    return (
        <div className='h-dvh bg-black overflow-hidden flex justify-center'> {/* reels-page */}

            {/* reels-feed */}
            <div className='h-full w-full max-w-120 scrollbar-hide overflow-y-auto snap-y snap-mandatory overscroll-y-contain overflow-auto scroll-smooth'>
                {items.length === 0 && (<div className='absolute inset-0 grid place-items-center text-white'><p>{emptyMessage}</p></div>)}

                {items.map((item) =>(
                    
                    <section className='relative h-dvh w-full snap-start bg-black' key={item._id}>

                        {/* Three-dot menu */}
                        <div data-menu className='absolute top-4 right-4 z-50'>
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

                        <video className='absolute inset-0 w-full h-full object-cover object-center bg-black' ref={setVideoRef(item._id)} src={item.video} muted playsInline loop preload='metadata' />

                        <div className='absolute inset-0 flex items-end pointer-events-none'> {/*reel-overlay*/}
                            
                            <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.05)_30%,rgba(0,0,0,0.35)_65%,rgba(0,0,0,0.65)_100%)]'> {/* reel-overlay-gradient*/}</div> {/*So the gradient uses .reel-overlay as its reference and the gradient covers the entire overlay. Same goes for reel-actions */}

                            <div className='absolute right-2.5 bottom-52 flex flex-col gap-3.5 pointer-events-auto'> {/*reel-actions */}
                                <div className='flex flex-col items-center gap-1 text-white'> {/*reel-action group */}
                                    <button className='w-12 h-12 rounded-full grid place-items-center text-white shadow-md border border-white/15 bg-black/35 backdrop-blur-[2px] hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer' onClick={onLike ? () => onLike(item) : undefined}> {/*reel-action */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                    </button>
                                    <div className='text-white text-center text-xs'> {/*reel-action_count */} {item.likesCount ?? 0} </div>
                                </div>

                                <div className='flex flex-col items-center gap-1 text-white'>
                                    <button className='w-12 h-12 rounded-full grid place-items-center text-white shadow-md border border-white/15 bg-black/35 backdrop-blur-[2px] hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer' onClick={onSave ? () => onSave(item) : undefined}> {/*reel-action */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                        </svg>
                                    </button>
                                    <div> {/*reel-action_count */} {item.savesCount ?? 0} </div>
                                </div>

                                <div className='flex flex-col items-center gap-1 text-white'>
                                    <button className='w-12 h-12 rounded-full grid place-items-center text-white shadow-md border border-white/15 bg-black/35 backdrop-blur-[2px] hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer' onClick={() => openComments(item._id)}> {/*reel-action */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                    </button>
                                    <div> {/*reel-action_count */} {activeCommentsFoodId === item._id ? comments.length : item.commentsCount ?? 0} </div>
                                </div>
                            </div>

                            <div className='relative w-full p-6 pb-[calc(env(safe-area-inset-bottom,0px)+72px)] flex flex-col pr-16 gap-4 pointer-events-auto'> {/*reel-content */} {/*position: relative. "I can be a reference point for my absolute children." */}
                                {item.name && (
                                     <h4 className='text-white text-shadow-sm text-shadow-black/40 text-lg font-bold leading-snug'>{/*reel-name */} {item.name}</h4>
                                )}

                                <p className='text-white text-xs text-shadow-sm text-shadow-black/40 leading-snug line-clamp-2 max-w-[90ch]' title={item.description}>{/*reel-description */} {item.description}</p>
                                {item.foodPartner && (<Link className='self-start bg-blue-500 text-white rounded-full py-2.5 px-4 font-bold tracking-wide no-underline shadow-md ease-base hover:bg-blue-600 hover:scale-[1.03] transition-all duration-200' to={"/food-partner/" + item.foodPartner}>Visit Store</Link>)}
                            </div>
                        </div>

                        {activeCommentsFoodId === item._id && (
                            <div className='absolute inset-0 z-50 flex items-end pointer-events-auto' onClick={closeComments}>
                                <div className='absolute inset-0 bg-black/60' />
                                <div
                                    className='relative w-full max-h-[70vh] bg-gray-900 rounded-t-2xl flex flex-col'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className='flex items-center justify-between px-4 py-3 border-b border-white/10'>
                                        <h3 className='text-white font-semibold'>Comments</h3>
                                        <button onClick={closeComments} className='text-slate-400 hover:text-white text-xl leading-none cursor-pointer'>
                                            &times;
                                        </button>
                                    </div>

                                    <div className='flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3'>
                                        {commentsLoading && (
                                            <p className='text-slate-400 text-sm text-center'>Loading comments...</p>
                                        )}

                                        {!commentsLoading && comments.length === 0 && (
                                            <p className='text-slate-400 text-sm text-center'>No comments yet. Be the first!</p>
                                        )}

                                        {!commentsLoading && comments.map((comment) => (
                                            <div key={comment._id} className='flex flex-col'>
                                                <span className='text-slate-300 text-xs font-semibold'>{comment.user?.fullName ?? 'Unknown'}</span>
                                                <span className='text-white text-sm'>{comment.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex items-center gap-2 px-4 py-3 border-t border-white/10 pb-[calc(env(safe-area-inset-bottom,0px)+12px)]'>
                                        <input
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && submitComment()}
                                            placeholder='Add a comment...'
                                            className='flex-1 bg-gray-800 text-white text-sm rounded-full px-4 py-2 outline-none border border-white/10'
                                        />
                                        <button
                                            onClick={submitComment}
                                            className='text-blue-500 font-semibold text-sm px-3 py-2 cursor-pointer disabled:opacity-40'
                                            disabled={!newComment.trim()}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                ) )}
            </div>
        </div>
    )
}

export default ReelFeed;