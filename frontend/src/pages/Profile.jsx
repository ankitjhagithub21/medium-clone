import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageLoading from './PageLoading';
import Blog from '../components/Blog';
import { useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';

const Profile = ({handleFollowUnfollow,following}) => {
  const { id } = useParams();
  const blogs = useSelector(state=>state.blogs.value)
  const [user, setUser] = useState(null);
  const currUser = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile/${id}`);
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          document.title = `${data.user.name} - Medium`;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (currUser?._id === id) {
      setUser(currUser);
      document.title = `${currUser.name} - Medium`;
      setLoading(false);
    } else {
      fetchUser();
    }
  }, [id, currUser]);

  if (loading) {
    return <PageLoading />;
  }

  if (!user) {
    return <p>User not found.</p>;
  }
  const userBlogs = blogs.filter(blog => blog.author._id == user._id);

  

  return (
    <>
      <Navbar />
      <UpdateProfile isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="container p-5 flex flex-wrap-reverse mx-auto">
        <div className="lg:w-2/3 w-full lg:p-5 p-0">
          <h1 className="text-4xl my-5 font-bold">{user.name}</h1>
          <div className="flex gap-5 items-start border-b p-2">
            <Link to="/">Home</Link>
            <Link to="/">About</Link>
          </div>
          <div className="flex flex-col gap-5">
            {userBlogs.map((blog) => {
              return <Blog key={blog._id} blog={blog} name={user.name} profilePhoto={user.profilePhoto} />;
            })}
          </div>
        </div>
        <div className="lg:w-1/4 w-full lg:border-l lg:p-5 flex flex-col gap-3 items-start">
          <img src={user.profilePhoto} alt="profile pic" loading="lazy" width={100} className="rounded-full" />
          <p className="text-xl font-bold">{user?.name}</p>
          <div className="flex gap-2 items-center">
            <p>Followers: {user?.followers.length}</p>
            <p>Following: {user?.following.length}</p>
          </div>
          <p>{user.bio}</p>
          {
            currUser?._id == user?._id ? <button className="text-green-900" onClick={() => setIsOpen(true)}>
            Edit Profile
          </button> : <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full" onClick={()=>handleFollowUnfollow(user._id)}>
              {
                following ? 'Unfollow' :'follow'
              }
            </button>
          }
         
        </div>
      </div>
    </>
  );
};

export default Profile;
