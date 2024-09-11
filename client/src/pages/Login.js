import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const login = async () => {
    try {
      const { data } = await axios.post("/users/login", user);
      // alert("login success");
      message.success("login success");
      navigate("/");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
    } catch (error) {
      // alert("something went wrong");
      message.error("something went wrong");
    }
  };
  // prevent for login user

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="bg-green-100 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4 bg-slate-50"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 bg-slate-50"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full text-white font-semibold hover:bg-blue-700 bg-blue-500 py-3 border-blue-500 rounded"
            onClick={login}
          >
            Login
          </button>
        </div>

        <div className="text-grey-dark mt-6 text-lg">
          Don't have an account?
          <Link to="../register/" className="text-blue-500 hover:text-blue-700">
            {" "}
            Register.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
