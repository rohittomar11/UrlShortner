// import { useEffect,  useState } from "react";

// import { useNavigate } from "react-router-dom";
// export const tokencheck=()=>{

// const [user, setUser] = useState(false);
//   const navigate = useNavigate();

//   // check token on site load + when token changes
//   useEffect(() => {
//     const checkToken = () => {
//       const token = localStorage.getItem("token");
//       setUser(!!token);
//     };

//     checkToken();

//     // Listen for storage changes (other tabs or manual updates)
//     window.addEventListener("storage", checkToken);

//     // Listen for custom event from login page
//     window.addEventListener("authChange", checkToken);

//     return () => {
//       window.removeEventListener("storage", checkToken);
//       window.removeEventListener("authChange", checkToken);
//     };
//   }, []);


//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(false);
//     navigate("/Login");
//     window.dispatchEvent(new Event("authChange")); // notify all listeners
//   };
// }