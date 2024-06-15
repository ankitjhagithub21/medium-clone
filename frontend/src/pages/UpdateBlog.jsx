import React, { useState, useEffect,useRef } from 'react'
import StoryNav from '../components/StoryNav'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageLoading from './PageLoading'
import JoditEditor from 'jodit-react';

const UpdateBlog = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const currUser = useSelector(state => state.auth.user)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const editor = useRef(null);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
                body: JSON.stringify({ title, content }),
            });
            const data = await res.json();
            if (data.success) {
                setBlog(data.blog);
            } else {
                console.error('Failed to update the blog.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`);
                const data = await res.json();
                if (data.success) {
                    setBlog(data.blog)
                    setTitle(data.blog.title)
                    setContent(data.blog.content)

                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlog();
    }, [id]);


    if (loading) {
        return <PageLoading />
    }
    if (!blog) {
        return <p>Blog not found.</p>
    }
    return (
        <>
            <StoryNav handleSubmit={handleSubmit} loading={loading} currUser={currUser} />
            <section className='lg:w-3/4 w-full mx-auto flex px-5 flex-col gap-5 py-10'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='text-4xl' required />
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </form>
            </section>
        </>
    )
}

export default UpdateBlog
