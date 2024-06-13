import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast';
import PageLoading from './PageLoading';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0); 
    const [commentCount,setCommentCount] = useState(0);

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            setUploading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/add/${blog._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ content })
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setContent('');
                fetchComments();
                setCommentCount(commentCount+1)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${id}/delete/${commentId}`, {
                method: "DELETE",
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                fetchComments();
                setCommentCount(commentCount-1)
                
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to delete comment.");
            console.log(error);
        }
    };

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${blog._id}`);
            const data = await res.json();
            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to load comments.");
            console.log(error);
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`);
                const data = await res.json();
                if (data.success) {
                    setBlog(data.blog);
                    setLikeCount(data.blog.likes.length); 
                    setIsLiked(data.blog.likes.includes(user?._id)); 
                    setCommentCount(data.blog.comments.length)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlog();
    }, [id]);

    const handleLikeUnlike = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/like/${id}`, {
                method: "POST",
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setIsLiked(!isLiked);
                setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        }
    };

    if (!blog) {
        return <PageLoading />;
    }

    const formattedDate = (date) => format(new Date(date), 'MMM dd, yyyy');

    return (
        <>
            <Navbar />
            <section className='lg:w-3/4 w-full mx-auto flex px-5 flex-col gap-5 py-10'>
                <img src={`${import.meta.env.VITE_SERVER_URL}/${blog.thumbnail}`} alt="blog thumbnail" className='max-h-[50vh] object-contain' />
                <h2 className='md:text-4xl text-2xl text-gray-800 font-bold'>{blog.title}</h2>
                <div className='flex items-center gap-2 '>
                    <img src={blog.author.profilePhoto} alt="author pic" className='w-12 rounded-full' />
                    <div className='flex flex-col items-start'>
                        <span className='font-semibold'>{blog.author.name}</span>
                        <span>{formattedDate(blog.createdAt)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-5 border-t border-b p-3">
                    <div className='flex items-center cursor-pointer' onClick={handleLikeUnlike}>
                        <button>
                            <svg width={24} height={24} viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.37.83L12 3.28l.63-2.45h-1.26zM13.92 3.95l1.52-2.1-1.18-.4-.34 2.5zM8.59 1.84l1.52 2.11-.34-2.5-1.18.4zM18.52 18.92a4.23 4.23 0 0 1-2.62 1.33l.41-.37c2.39-2.4 2.86-4.95 1.4-7.63l-.91-1.6-.8-1.67c-.25-.56-.19-.98.21-1.29a.7.7 0 0 1 .55-.13c.28.05.54.23.72.5l2.37 4.16c.97 1.62 1.14 4.23-1.33 6.7zm-11-.44l-4.15-4.15a.83.83 0 0 1 1.17-1.17l2.16 2.16a.37.37 0 0 0 .51-.52l-2.15-2.16L3.6 11.2a.83.83 0 0 1 1.17-1.17l3.43 3.44a.36.36 0 0 0 .52 0 .36.36 0 0 0 0-.52L5.29 9.51l-.97-.97a.83.83 0 0 1 0-1.16.84.84 0 0 1 1.17 0l.97.97 3.44 3.43a.36.36 0 0 0 .51 0 .37.37 0 0 0 0-.52L6.98 7.83a.82.82 0 0 1-.18-.9.82.82 0 0 1 .76-.51c.22 0 .43.09.58.24l5.8 5.79a.37.37 0 0 0 .58-.42L13.4 9.67c-.26-.56-.2-.98.2-1.29a.7.7 0 0 1 .55-.13c.28.05.55.23.73.5l2.2 3.86c1.3 2.38.87 4.59-1.29 6.75a4.65 4.65 0 0 1-4.19 1.37 7.73 7.73 0 0 1-4.07-2.25zm3.23-12.5l2.12 2.11c-.41.5-.47 1.17-.13 1.9l.22.46-3.52-3.53a.81.81 0 0 1-.1-.36c0-.23.09-.43.24-.59a.85.85 0 0 1 1.17 0zm7.36 1.7a1.86 1.86 0 0 0-1.23-.84 1.44 1.44 0 0 0-1.12.27c-.3.24-.5.55-.58.89-.25-.25-.57-.4-.91-.47-.28-.04-.56 0-.82.1l-2.18-2.18a1.56 1.56 0 0 0-2.2 0c-.2.2-.33.44-.4.7a1.56 1.56 0 0 0-2.63.75 1.6 1.6 0 0 0-2.23-.04 1.56 1.56 0 0 0 0 2.2c-.24.1-.5.24-.72.45a1.56 1.56 0 0 0 0 2.2l.52.52a1.56 1.56 0 0 0-.75 2.61L7 19a8.46 8.46 0 0 0 4.48 2.45 5.18 5.18 0 0 0 3.36-.5 4.89 4.89 0 0 0 4.2-1.51c2.75-2.77 2.54-5.74 1.43-7.59L18.1 7.68z"
                                />
                            </svg>
                        </button>
                        <span>{likeCount}</span> 
                    </div>
                    <div className='flex items-center cursor-pointer' onClick={() => {
                        fetchComments();
                        setIsOpen(!isOpen);
                    }}>
                        <button>
                            <svg width={24} height={24} viewBox="0 0 24 24">
                                <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z" />
                            </svg>
                        </button>
                        <span>{commentCount}</span>
                    </div>
                </div>
                <div className='font-serif text-xl leading-relaxed' dangerouslySetInnerHTML={{ __html: blog.content }} />
            </section>
            <div className={`lg:w-1/3 md:w-1/2 overflow-auto w-full flex flex-col p-3 gap-5 transition-all shadow-lg h-full bg-white z-50 fixed ${isOpen ? 'right-0' : 'right-[-100%]'} top-0`}>
                <div className='flex justify-between items-center '>
                    <h2 className='text-2xl font-bold'>Responses ({comments.length})</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M5 5l7 7m7 7l-7-7m0 0l7-7m-7 7l-7 7"
                                stroke="currentColor"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className='rounded-lg shadow-lg p-2 flex flex-col gap-2 bg-white'>
                    <div className='flex items-center gap-2'>
                        <img src={user?.profilePhoto} alt="profile pic" className='w-8 rounded-full' />
                        <span>{user?.name}</span>
                    </div>
                    <form className='flex flex-col gap-3' onSubmit={handleAddComment}>
                        <textarea className='h-32 p-2 resize-none' value={content} onChange={(e) => setContent(e.target.value)} placeholder='What are your thoughts?' required></textarea>
                        <button className={`rounded-full ${content.length === 0 ? 'bg-green-400' : 'bg-green-600'} text-white px-4 py-2 cursor-pointer`} type='submit' disabled={content.length === 0}>
                            {uploading ? 'Responding...' : 'Respond'}
                        </button>
                    </form>
                </div>
                <div>
                    <div className='flex gap-2 items-center mb-2 p-3'>
                        <b className='text-sm'>MOST RELEVANT</b>
                        <IoIosArrowDown />
                    </div>
                    <hr className='w-full' />
                    <div className='flex flex-col gap-3'>
                        {loadingComments ? (
                            <p>Loading comments...</p>
                        ) : (
                            comments.map(comment => (
                                <div key={comment._id} className='rounded-lg shadow-lg p-2 flex flex-col gap-2 bg-white'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <img src={comment.userId.profilePhoto} alt="profile pic" className='w-10 rounded-full' />
                                            <div className='flex flex-col text-sm'>
                                                <span className='font-semibold'>{comment.userId.name}</span>
                                                <span>{formattedDate(comment.date)}</span>
                                            </div>
                                        </div>
                                        {user?._id === comment.userId._id && (
                                            <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 hover:text-red-700">
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>
                                    <p>{comment.content}</p>
                                </div>
                            )).reverse()
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default BlogDetails;
