import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { loginModel } from "../models/login.js";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [message, setMessage] = useState("");

  const submit = async (data) => {
    loginModel.Email = data.Email;
    loginModel.Password = data.Password;

    try {
      const res = await axios.post(
        "http://localhost:7777/users/login",
        loginModel
      );
      
      // Save token
      localStorage.setItem("token", res.data.token);

      setMessage(res.data.message || "Login successful!");
      alert("Login successful!");

      // Redirect to Dashboard (Home already handles conditional rendering)
      navigate("/");

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Login failed");
      alert("Login failed: " + (err.response?.data?.message || "Invalid credentials"));
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          {message && <p className="text-center text-sm text-red-600">{message}</p>}

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.Email && (
              <span className="text-red-600 text-sm">{errors.Email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Password cannot be more than 15 characters",
                },
              })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.Password && (
              <span className="text-red-600 text-sm">{errors.Password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


