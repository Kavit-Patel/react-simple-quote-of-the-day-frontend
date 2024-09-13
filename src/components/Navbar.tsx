import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { IUser } from "../types";

const Navbar = () => {
  const queryClient = useQueryClient();
  const user: IUser | undefined = queryClient.getQueryData("user");
  const handleLogout = () => queryClient.setQueryData("user", null);
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
              <button onClick={handleLogout} className="text-red-200 ">
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
