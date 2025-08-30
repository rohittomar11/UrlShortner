import axios from "axios";
import { useEffect, useState } from "react";

export const MyLinkList = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLinkList = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:7777/links/getAllLinks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllLinks(res.data);
      console.log("Links from database:", res.data);
    } catch (err) {
      console.error("Error fetching links:", err);
      setError("Failed to load links. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // fetch links automatically on mount
  useEffect(() => {
    getLinkList();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">My Links</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && allLinks.length === 0 && (
        <p className="text-gray-600">No links found. Generate one!</p>
      )}

      <ul className="space-y-3">
        {allLinks.map((link) => (
          <li
            key={link._id}
            className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between items-center"
          >
            <span className="text-gray-700 truncate max-w-xs">
              {link.originalURL}
            </span>
            <a
              href={link.shortURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {link.shortURL}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyLinkList;

