import React from "react";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { setCredientials } from "../../redux/features/auth/authSlice";

import { Link } from "react-router-dom";

import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if(password!==confirmPassword){
        toast.error("Passwords do not match")
    }else{
        try{

            const res = await updateProfile({username,email,password}).unwrap()
            dispatch(setCredientials({...res}))
            toast.success("Profile Updated successfully")
        }catch(error){
            toast.error(error?.data?.message||error.message)
        }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center  align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4 ">Update Profile</h2>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-black mb-2"> Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-input p-4 rounded-sm w-full border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input p-4 rounded-sm w-full border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                className="form-input p-4 rounded-sm w-full border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                className="form-input p-4 rounded-sm w-full border"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                My Orders
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
