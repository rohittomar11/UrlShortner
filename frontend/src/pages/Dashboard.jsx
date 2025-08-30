
import axios from "axios";
import { linkDataModel } from "../models/Linkdata.js";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Dashboard = () => {
  const [link, setLink] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const submitLink = async (data) => {
    try {
      linkDataModel.link = data.link;
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must login first!");
        return;
      }

      const res = await axios.post(
        "http://localhost:7777/links/link",
        linkDataModel,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const shortlink = res.data.shortURL;
      setLink(shortlink);
      reset(); // clear input
    } catch (err) {
      console.error("Error creating short link:", err);
      alert("Failed to create short link. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Generate Short Link
      </h2>

      <form onSubmit={handleSubmit(submitLink)} className="flex flex-col gap-4">
        <input
          {...register("link")}
          type="text"
          placeholder="Enter your URL here"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
        >
          Generate
        </button>
      </form>

      {link && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Short Link:</h3>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {link}
          </a>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

