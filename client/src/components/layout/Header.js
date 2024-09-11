import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const LogoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center bg-green-100 rounded-lg mt-3 ml-4 mr-4 py-3 px-8">
      <Link to="/">
        <div className="flex items-center ">
          <img
            src={require("../assets/logo.png")}
            alt="Logo"
            className="w-10 h-10 mr-2"
          />
          <span className="font-bold fs-3 ml-3">Spend Wise</span>
        </div>
      </Link>
      <div className="flex items-center">
        <img
          src={require("../assets/avatar.png")}
          alt="avatar"
          className="w-15 h-10"
        />
        <span className="fs-4  mr-6">{loginUser && loginUser.name}</span>
        <button
          className="btn btn-outline-danger py-2 px-4 rounded"
          onClick={LogoutHandler}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Header;
