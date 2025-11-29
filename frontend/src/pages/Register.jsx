import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const formSubmit = async (data) => {
    try {
      console.log("Register data:", data);

      const res = await axios.post(
        "http://localhost:7777/user/register",
        data
      );

      setMessage(res.data.message || "Registered successfully!");
      if (res.status === 200) {
        navigate("/Login");
      }
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Name */}
        <label className="block mb-2">Name</label>
        <input
          {...register("name", {
            required: "Name is required",
            maxLength: { value: 20, message: "Max 20 characters" },
          })}
          type="text"
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        {/* Email */}
        <label className="block mb-2 mt-4">Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email address",
            },
          })}
          type="email"
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        {/* Password */}
        <label className="block mb-2 mt-4">Password</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Min 8 characters" },
            maxLength: { value: 15, message: "Max 15 characters" },
          })}
          type="password"
          className="w-full border rounded-lg px-3 py-2 mb-2"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        {/* Date */}
        <label className="block mb-2 mt-4">Date</label>
        <input
          {...register("date")}
          type="date"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />
        {errors.date && (
          <span className="text-red-500">{errors.date.message}</span>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
