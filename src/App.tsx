import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import History from "./pages/History";
import Register from "./pages/Register";
import { useAuth } from "./context/UseAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/history" element={user ? <History /> : <Home />} />
      </Routes>
    </div>
  );
};

export default App;
