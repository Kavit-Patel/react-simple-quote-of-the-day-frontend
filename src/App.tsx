import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import History from "./pages/History";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useQueryClient } from "react-query";
import { useFetchProfile } from "./api/api";
import { useEffect } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const { data: cachedUser } = useQuery("user", () =>
    queryClient.getQueryData("user")
  );
  const { data: fetchedUser, refetch } = useFetchProfile();
  const user = cachedUser || fetchedUser;
  useEffect(() => {
    if (!cachedUser) {
      refetch();
    }
  }, [cachedUser, refetch]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/history" element={user ? <History /> : <Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/" element={<Home />} index />
      </Routes>
    </div>
  );
};

export default App;
