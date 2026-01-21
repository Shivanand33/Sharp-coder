import React, { useState } from "react";
import Lottie from "lottie-react";
import api from '../config/Api.jsx';
import toast from "react-hot-toast";
import log from "../assets/animation/Mobile.json";
import boy from "../assets/animation/Boy.json";

const Login = () => {
  const [formData, setformdata] = useState({
    
    email: "",
    password:"",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let Error = {};

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email,
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    console.log(formData);

    try {
      const res = await api.post("/auth/login", formData);

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid bg-yellow-500 min-h-screen grid-cols-1 md:grid-cols-2 items-center">
        <div className="flex justify-center ">
          <Lottie animationData={log} className="w-full max-w-md" />
        </div>

        <div className="w-[52%] h-screen mx-auto text-center flex items-center justify-center">
          <div className=" ">
            <h1 className="text-2xl font-bold">Login Your Account</h1>

            <Lottie animationData={boy} className="w-full" />
            <form onSubmit={handleSubmit} className=" grid gap-3 w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Your Email"
                className="border border-gray-200 p-2 rounded"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="border border-gray-200 p-2 rounded mb-2"
              />
              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
