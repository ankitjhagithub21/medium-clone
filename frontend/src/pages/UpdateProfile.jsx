import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../app/slices/authSlice';
import uploadImage from '../app/helpers/uploadImage';

const UpdateProfile = ({ isOpen, setIsOpen }) => {
  const currUser = useSelector((state) => state.auth.user);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState(currUser.name);
  const [bio, setBio] = useState(currUser.bio);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImage = {};
      if (profilePhoto) {
        uploadedImage = await uploadImage(profilePhoto);
        if (!uploadedImage.url) {
          throw new Error('Error uploading image.');
        }
      }

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, bio, profilePhoto: uploadedImage.url || currUser.profilePhoto }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(data.user));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex h-screen w-full items-center transition justify-center ${isOpen ? 'fixed' : 'hidden'} top-0 left-0 p-5`}>
      <div className="lg:w-1/3 w-full shadow-lg rounded-lg bg-white z-50 p-5">
        <h2 className="text-2xl font-semibold text-center mb-10">Profile Information</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <label htmlFor="image" className='border rounded-full mb-2 cursor-pointer mx-auto w-24 h-24 flex items-center justify-center bg-gray-100'>Image
           
          </label>
          <input
            type="file"
            id='image'
            
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            className="mb-3 hidden"
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-lg bg-gray-200"
            required
          />
          <label htmlFor="bio">Short bio</label>
          <textarea
            value={bio}
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className="p-2 rounded-lg bg-gray-200"
          ></textarea>
          <div className="flex items-center gap-2 justify-end mt-4">
            <button
              type="button"
              className="border border-green text-green-600 hover:bg-green-600 hover:text-white py-2 px-4 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
