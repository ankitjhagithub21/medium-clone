import React, { useState } from 'react';
import toast from 'react-hot-toast';

const OtherUser = ({ user, isFollowing }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollowUnfollow = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/follow/${user._id}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setFollowing(!following);  
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error!");
    }
  };

  return (
    <div className='flex items-center gap-2 justify-between'>
      <div className='flex gap-1 items-start'>
        <img src={user.profilePhoto} alt="user profile image" className='w-8 rounded-full border' />
        <div>
          <h2 className='font-bold'>{user.name}</h2>
          <p className='text-sm'>{user.bio}</p>
        </div>
      </div>
      <div>
        <button 
          className='px-4 py-2 text-sm border border-black rounded-full' 
          onClick={handleFollowUnfollow}
        >
          {following ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default OtherUser;
