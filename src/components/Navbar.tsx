import { Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between text-white">
        <Link to="/" className="font-bold">
          Quote of the Day
        </Link>
        <div className="flex gap-6">
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="#">
                Hi,{" "}
                {user.email.split("@")[0].charAt(0).toUpperCase() +
                  user.email.split("@")[0].slice(1)}
              </Link>
              <Link to="/history" className="">
                History
              </Link>
              <button onClick={() => logOut()} className="text-red-200 ">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
