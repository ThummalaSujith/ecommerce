import React from "react";

import { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setCredientials } from "../../redux/features/auth/authSlice";

import { toast } from "react-toastify";

import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setUsername] = useState("");

  const [useremail, setEmail] = useState("");

  const [password, setpassword] = useState("");

  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email:useremail, password }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  return (
    <section className="pl-[12rem] flex flex-wrap flex-col">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4"> Register</h1>
      </div>

      <form onSubmit={submitHandler} className="container w-[40rem]">
        <div className="my-[2rem]">
          <label
            htmlFor="name"
            className="block text-md font-medium text-black"
          >
            Name
          </label>

          <input
            type="text"
            id="name"
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="my-[2rem]">
          <label
            htmlFor="email"
            className="block text-md font-medium text-black"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter your Email"
            value={useremail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-[2rem]">
          <label
            htmlFor="password"
            className="block text-md font-medium text-black"
          >
            Password
          </label>

          <input
            type="password"
            id="Password"
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <div className="my-[2rem]">
          <label
            htmlFor="confirm password"
            className="block text-md font-medium text-black"
          >
            Confirm Password
          </label>

          <input
            type="password"
            id="confirm password"
            className="mt-2 p-2 border rounded w-full"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-4 ">
        <p className="text-black">
          Already have an account ?{" "}
          <Link
            className="text-pink-500 hover:underline"
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>

  );
};

export default Register;
