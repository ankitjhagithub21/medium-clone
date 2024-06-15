import React from 'react';
import { LuDot } from "react-icons/lu";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import truncate from 'html-truncate';

const Blog = ({ blog}) => {
    const navigate = useNavigate();
    const formattedDate = format(new Date(blog.createdAt), 'MMM dd, yyyy');
    
    // Truncate HTML content to a specific length
    const truncatedContent = truncate(blog.content, 200, { ellipsis: '...' });

    return (
        <div className='flex flex-col w-full my-5'>
            <div className='flex items-center gap-2 mb-2'>
                <img src={blog.author.profilePhoto} alt="author pic" className='rounded-full cursor-pointer w-8 border' onClick={()=>navigate(`/user/${blog.author._id}`)}/>
                <div className='text-sm flex items-center gap-1'>
                    <span>{blog.author.name}</span>
                    <span>
                        <LuDot />
                    </span>
                    <span className='text-gray-600'>{formattedDate}</span>
                </div>
            </div>
            <div className='flex items-center gap-4 cursor-pointer ' onClick={() => navigate(`/blog/${blog._id}`)}>
                <div className={`${blog.thumbnail ? 'w-3/4' :'w-full'}`}>
                    <h2 className='md:text-2xl mb-2 text-lg font-bold text-gray-800'>{blog.title}</h2>
                    <p className='text-serif hidden md:block' dangerouslySetInnerHTML={{ __html: truncatedContent }}></p>
                </div>
               {
                blog.thumbnail &&  <div>
                <img src={blog.thumbnail} alt="blog thumbnail" loading='lazy' className='object-cover object-center w-44' />
            </div>
               }
            </div>
            <div className='flex justify-between mt-5 items-center'>
                <div className='flex items-center gap-2 text-sm'>
                    <span className='py-1 px-2 rounded-full bg-gray-100 min-w-fit'>{blog.topic}</span>
                    <span className='hidden md:block'>5 min read</span>
                </div>
                <div className='flex items-center gap-2 text-gray-600'>
                    <button>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z"
                                fill="#000"
                            />
                        </svg>
                    </button>
                    <button>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.25 12h7.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.39 12c0 .55.2 1.02.59 1.41.39.4.86.59 1.4.59.56 0 1.03-.2 1.42-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.6-1.41A1.93 1.93 0 0 0 6.4 10c-.55 0-1.02.2-1.41.59-.4.39-.6.86-.6 1.41zM10 12c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.54 0 1.02-.2 1.4-.59.4-.39.6-.86.6-1.41 0-.55-.2-1.02-.6-1.41a1.93 1.93 0 0 0-1.4-.59c-.55 0-1.04.2-1.42.59-.4.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.57 1.41.4.4.88.59 1.43.59.57 0 1.04-.2 1.43-.59.39-.39.57-.86.57-1.41 0-.55-.2-1.02-.57-1.41A1.93 1.93 0 0 0 17.6 10c-.55 0-1.04.2-1.43.59-.38.39-.57.86-.57 1.41z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Blog;
