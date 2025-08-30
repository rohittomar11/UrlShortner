
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect,  useState } from "react";

const Home = () => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  // check token on site load + when token changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setUser(!!token);
    };

    checkToken();

    // Listen for storage changes (other tabs or manual updates)
    window.addEventListener("storage", checkToken);

    // Listen for custom event from login page
    window.addEventListener("authChange", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("authChange", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/Login");
    window.dispatchEvent(new Event("authChange")); // notify all listeners
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">NanoMech</h1>

        <div className="flex gap-4">
          {!user ? (
            <>
              <Link
                to="/Login"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/Register"
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/Dashboard"
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/MyLinks"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                My Links
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
