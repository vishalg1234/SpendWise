import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { name, email, password, confirm_password } = user;
    // console.log(user);

    if (name && email && password && password === confirm_password) {
      try {
        await axios.post("/users/register", user);
        // alert("Registration successfull");
        message.success("Registration successfull");

        navigate("/login");
      } catch (error) {
        // alert("something went wrong");
        message.error("something went wrong");
      }
    } else {
      // alert("password not same");
      message.error("password not same");
    }
  };

  // prevent for login user

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="bg-green-100 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4 bg-slate-50"
              name="name"
              value={user.name}
              placeholder="Full Name"
              onChange={handleChange}
            />
            <input
              type="email"
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
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4 bg-slate-50"
              name="confirm_password"
              value={user.confirm_password}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full text-white font-semibold hover:bg-blue-700 bg-blue-500 py-3 border-blue-500 rounded"
              onClick={register}
            >
              Create Account
            </button>
          </div>

          <div className="text-grey-dark mt-6 text-lg">
            Already have an account?
            <Link to="../login/" className="text-blue-500 hover:text-blue-700">
              {" "}
              Login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
