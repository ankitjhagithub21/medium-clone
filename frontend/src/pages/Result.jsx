import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';

const Result = () => {
    const { id } = useParams();
    const blogs = useSelector(state => state.blogs.value);

    // Filter blogs based on the id parameter
    const filteredBlogs = blogs.filter(blog => {
        const searchId = id.toLowerCase();
        return (
            blog.title.toLowerCase().includes(searchId) ||
            blog.topic.toLowerCase().includes(searchId) ||
            blog.content.toLowerCase().includes(searchId) ||
            blog.author.name.toLowerCase().includes(searchId)
        );
    });
    if(filteredBlogs.length ==0){
        return <NotFound/>
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-12">
                    {filteredBlogs.map((blog) => (
                        <div key={blog._id} className="p-12 md:w-1/2 flex flex-col items-start">
                            <span className="inline-block py-1 px-4 bg-gray-100 rounded-lg">
                                {blog.topic}
                            </span>
                            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                                {blog.title}
                            </h2>
                            <p className="leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                            <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                                <Link className="text-indigo-500 inline-flex items-center" to={`/blog/${blog._id}`}>
                                    Learn More
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                    <div className='flex items-center cursor-pointer'>
                                        <svg width={24} height={24} viewBox="0 0 24 24">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11.37.83L12 3.28l.63-2.45h-1.26zM13.92 3.95l1.52-2.1-1.18-.4-.34 2.5zM8.59 1.84l1.52 2.11-.34-2.5-1.18.4zM18.52 18.92a4.23 4.23 0 0 1-2.62 1.33l.41-.37c2.39-2.4 2.86-4.95 1.4-7.63l-.91-1.6-.8-1.67c-.25-.56-.19-.98.21-1.29a.7.7 0 0 1 .55-.13c.28.05.54.23.72.5l2.37 4.16c.97 1.62 1.14 4.23-1.33 6.7zm-11-.44l-4.15-4.15a.83.83 0 0 1 1.17-1.17l2.16 2.16a.37.37 0 0 0 .51-.52l-2.15-2.16L3.6 11.2a.83.83 0 0 1 1.17-1.17l3.43 3.44a.36.36 0 0 0 .52 0 .36.36 0 0 0 0-.52L5.29 9.51l-.97-.97a.83.83 0 0 1 0-1.16.84.84 0 0 1 1.17 0l.97.97 3.44 3.43a.36.36 0 0 0 .51 0 .37.37 0 0 0 0-.52L6.98 7.83a.82.82 0 0 1-.18-.9.82.82 0 0 1 .76-.51c.22 0 .43.09.58.24l5.8 5.79a.37.37 0 0 0 .58-.42L13.4 9.67c-.26-.56-.2-.98.2-1.29a.7.7 0 0 1 .55-.13c.28.05.55.23.73.5l2.2 3.86c1.3 2.38.87 4.59-1.29 6.75a4.65 4.65 0 0 1-4.19 1.37 7.73 7.73 0 0 1-4.07-2.25zm3.23-12.5l2.12 2.11c-.41.5-.47 1.17-.13 1.9l.22.46-3.52-3.53a.81.81 0 0 1-.1-.36c0-.23.09-.43.24-.59a.85.85 0 0 1 1.17 0zm7.36 1.7a1.86 1.86 0 0 0-1.23-.84 1.44 1.44 0 0 0-1.12.27c-.3.24-.5.55-.58.89-.25-.25-.57-.4-.91-.47-.28-.04-.56 0-.82.1l-2.18-2.18a1.56 1.56 0 0 0-2.2 0c-.2.2-.33.44-.4.7a1.56 1.56 0 0 0-2.63.75 1.6 1.6 0 0 0-2.23-.04 1.56 1.56 0 0 0 0 2.2c-.24.1-.5.24-.72.45a1.56 1.56 0 0 0 0 2.2l.52.52a1.56 1.56 0 0 0-.75 2.61L7 19a8.46 8.46 0 0 0 4.48 2.45 5.18 5.18 0 0 0 3.36-.5 4.89 4.89 0 0 0 4.2-1.51c2.75-2.77 2.54-5.74 1.43-7.59L18.1 7.68z"
                                            />
                                        </svg>
                                        <span>{blog.likes.length}</span>
                                    </div>
                                </span>
                                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                    </svg>
                                    {blog.comments.length}
                                </span>
                            </div>
                            <a className="inline-flex items-center">
                                <img
                                    alt="blog"
                                    src={blog.author.profilePhoto}
                                    className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                                />
                                <span className="flex-grow flex flex-col pl-4">
                                    <span className="title-font font-medium text-gray-900">
                                        {blog.author.name}
                                    </span>
                                    <span className="text-gray-500 text-sm mt-0.5">
                                        {blog.createdAt.slice(0, 10)}
                                    </span>
                                </span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <Link to="/" className="fixed text-3xl top-5 left-5">
                <FaHome />
            </Link>
        </section>
    );
};

export default Result;
