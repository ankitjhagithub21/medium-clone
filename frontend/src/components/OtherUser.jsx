import React from 'react';
import { Link } from 'react-router-dom';


const OtherUser = ({ user, handleFollowUnfollow,following}) => {
 

  

  return (
    <div className='flex items-center gap-2 justify-between'>
      <Link className='flex gap-1 items-center' to={`/user/${user._id}`}>
        <img src={user.profilePhoto} alt="user profile image" className='w-10 rounded-full border' />
        <div>
          <h2 className='font-bold'>{user.name}</h2>
          <p className='text-sm'>{user.bio}</p>
        </div>
      </Link>
      <div>
        <button 
          className={`px-4 py-2 text-sm ${following ? 'bg-black text-white':'border border-black'}  rounded-full` }
          onClick={()=>handleFollowUnfollow(user._id)}
        >
          {following ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default OtherUser;
