import React, { useEffect, useState } from 'react';
import OtherUser from './OtherUser';
import { useSelector } from 'react-redux';

const OtherUsers = ({handleFollowUnfollow}) => {
  const [users, setUsers] = useState([]);
  const currUser = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try { 
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`);
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='font-bold text-lg'>Who to follow</h2>
      {users
        .filter(user => user._id !== currUser._id)  
        .map(user => (
          <OtherUser 
            user={user} 
            key={user._id} 
           
            handleFollowUnfollow={handleFollowUnfollow} 
            following={currUser.following.includes(user._id)} 

          />
        ))
      }
    </div>
  );
}

export default OtherUsers;
