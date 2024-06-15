import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import { useSelector } from 'react-redux';
import StoryNav from '../components/StoryNav';
import uploadImage from '../helpers/uploadImage';

const NewStory = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const editor = useRef(null);
  const currUser = useSelector(state => state.auth.user);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let thumbnailUrl = '';
      if (thumbnail) {
        const uploadedImage = await uploadImage(thumbnail);
        if (!uploadedImage) {
          throw new Error('Error uploading image.');
        }
        thumbnailUrl = uploadedImage.url;
      }

      const body = JSON.stringify({
        title,
        content,
        topic,
        thumbnail: thumbnailUrl,
      });

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/upload`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setContent('');
        setTopic('');
        setThumbnail(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'New story - Medium';
  }, []);

  return (
    <>
      <StoryNav loading={loading} handleSubmit={handleSubmit} currUser={currUser} />
      <div className="lg:w-1/2 my-10 p-5 w-full mx-auto">
        <div className="flex flex-col gap-5 font-serif">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text-5xl p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
          />
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
            className="text-lg p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
          />
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
          <div className="relative">
            <input
              type="file"
              id="thumbnail"
              className="hidden"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
            <label htmlFor="thumbnail" className="cursor-pointer bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 ">
              {thumbnail ? thumbnail.name : 'Choose a thumbnail'}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewStory;
