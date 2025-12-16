import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    //google login hook ek
    onSuccess: (response) => {
      console.log(response);
      axios
        .post(import.meta.env.VITE_API_URL + "/api/users/google-login", {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          const user = res.data.user;
          if (user.role == "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("Google login failed:", err);
          toast.error("Google login failed. Please try again.");
        });
    }, //google login ek succes unat passe apu token ek print karann
  });

  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        { email, password }
      );

      // Save token
      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful");

      const user = response.data.user;
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("Login failed:", e);
      toast.error("Login failed. Please check your credentials");
    }
  }

  return (
    <div className="w-full h-screen flex bg-[url('/cosmatic.jpg')] bg-cover bg-center">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 h-full text-white flex-col justify-center items-start px-16 bg-black/30 backdrop-blur-[2px]">
        <img
          src="/logo.png"
          alt="CBC Logo"
          className="w-36 h-36 mb-8 object-cover"
        />
        <h1 className="text-5xl font-bold leading-tight">
          <span className="text-primary">Glow in.</span>{" "}
          <span className="text-primary">Shop on.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-200 max-w-lg">
          Welcome to your CBC dashboard – manage orders, track inventory, and
          keep your beauty line sparkling.
          <br />
          <span className="italic">Secure, fast, elegant.</span>
        </p>
        <p className="mt-20 text-sm text-gray-300">
          © 2025 CBC – Crystal Beauty Clear. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 h-[600px]">
        <div className="backdrop-blur-md bg-black/10 border border-white/20 shadow-2xl rounded-2xl p-8 flex flex-col gap-3 text-white transition-all hover:scale-[1.02] duration-300 w-[350px]">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img
              src="/logo.png"
              alt="CBC Logo"
              className="w-20 h-20 object-cover"
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-primary">
            <span className="text-accent">Welcome back</span>
          </h2>
          <p className="text-sm text-white text-center -mt-3">
            Sign in to continue to your CBC workspace
          </p>

          {/* Email Input */}
          <div>
            <label className="text-sm text-white">Email address</label>
            <input
              type="email"
              placeholder="e.g: you@cbc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-4 mt-1 rounded-xl bg-white/30 border border-boardercolor text-accent placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
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
              className="w-full h-10 px-4 mt-1 rounded-xl bg-white/30 border border-boardercolor text-accent placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end items-center text-sm text-white">
            <Link to="/forget-password" className="text-accent hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full h-10 rounded-xl bg-gradient-to-r from-pink to-accent text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center ">
            <div className="flex-grow h-px bg-bordercolor"></div>
            <span className="px-3 text-sm text-secondary">OR</span>
            <div className="flex-grow h-px bg-bordercolor"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={googleLogin}
            className="w-full h-10 rounded-xl flex items-center justify-center gap-3  bg-white text-accent font-semibold hover:bg-primary transition-all duration-300 shadow-md"
          >
            <img
              src="/google.png"
              alt="Google"
              className=" w-6 h-6 rounded-full object-cover"
            />
            Continue with Google
          </button>

          {/* Extra Links */}
          <p className="text-sm text-white text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
