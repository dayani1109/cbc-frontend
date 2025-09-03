import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        { email: email, password: password }
      );

      localStorage.setItem("token", response.data.token); //token ek save karanava localStorage eke
      toast.success("Login Successful");

      const user = response.data.user;
      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("Login failed :", e);

      toast.error("Login failed. Please check your credentials");
    }
  }

  return (
    <div className="w-full h-screen flex bg-[url('classroom.png')] bg-cover bg-center">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 h-full text-white flex-col justify-center items-start px-16 bg-black/30 backdrop-blur-[2px]">
        <img
          src="logor.png"
          alt="ITGuru Logo"
          className="w-35 h-35 mb-8 object-cover"
        />

        <h1 className="text-5xl font-bold leading-tight">
          <span className="text-primary">ITGuru</span>{" "}
          <span className="text-primary">E-Tutoring</span>
        </h1>

        <p className="mt-6 text-lg text-gray-200 max-w-lg">
          Join A/L classes with expert guidance from{" "}
          <span className="font-semibold">Mr. Janaka Wickramage</span> and
          enhance your IT skills. <br />
          <span className="italic">Learn smart, fast, and effectively.</span>
        </p>

        <p className="mt-20 text-sm text-gray-300">
          © 2025 ITGuru – All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 h-[600px]  bg-black/30 backdrop-blur-[2px]">
        <div
          className=" 
                        backdrop-blur-md bg-black/10 border border-white/20 
                        shadow-2xl rounded-2xl p-8 flex flex-col gap-3 text-white
                        transition-all hover:scale-[1.02] duration-300 w-[350px]"
        >
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img
              src="logor.png"
              alt="ITGuru Logo"
              className="w-20 h-20 object-cover"
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-primary">
            <span className="text-accent">Welcome back</span>
          </h2>
          <p className="text-sm text-white text-center -mt-3">
            Sign in to access your ITGuru classes
          </p>

          {/* Email Input */}
          <div>
            <label className="text-sm text-white">Email address</label>
            <input
              type="email"
              placeholder="e.g : student@itguru.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 mt-1 rounded-xl 
                         bg-white/30 border border-boardercolor text-white
                         placeholder-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-sm text-white">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 mt-1 rounded-xl 
                         bg-white/30 border border-boardercolor text-white
                         placeholder-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex justify-end items-center text-sm text-white">
            <a href="#" className="text-accent hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-accent to-boardercolor 
                       text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg bg-accent"
          >
            Login
          </button>

          {/* Extra Links */}
          <p className="text-sm text-white text-center">
            Don’t have an account?{" "}
            <a href="#" className="text-accent hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
