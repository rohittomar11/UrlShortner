import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MyLinkList from "./pages/MyLinkList"; // import MyLinks

// Protected Route wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/Login" replace />;
};

const App = () => {
  return (
    <Routes>
      {/* Home as layout with Navbar + Outlet */}
      <Route path="/" element={<Home />}>
        {/* Public routes */}
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="MyLinks"
          element={
            <PrivateRoute>
              <MyLinkList />
            </PrivateRoute>
          }
        />

        {/* Default route */}
        <Route index element={<Navigate to="/Dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default App;


