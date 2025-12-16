import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function register() {
    if (password !== confirmPassword) {
      toast.error("password do not match");
      return;
    }
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/",
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        }
      );

      toast.success("Register successfull Please login.");
      navigate("/login");
    } catch (e) {
      console.error("Register failed:", e);
      toast.error("Register failed. Please check your credentials");
    }
  }

  return (
    <div className="w-full h-screen flex bg-[url('/cosmatic.jpg')] bg-cover bg-center">
      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-5 h-[600px]">
        <div className="backdrop-blur-md bg-black/10 border border-white/20 shadow-2xl rounded-2xl p-5 flex flex-col gap-3 text-white transition-all hover:scale-[1.02] duration-300 w-[350px] mt-10 mb-10">
          {/* Logo */}
          <div className="flex justify-center ">
            <img
              src="/logo.png"
              alt="CBC Logo"
              className="w-15 h-15 object-cover"
            />
          </div>

          {/* Heading */}

          {/* Email Input */}
          <div>
            <label className="text-sm text-white">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="e.g: you@cbc.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-4 mt-1 rounded-xl  bg-white border border-boardercolor text-accent placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* First Name Input */}
          <div>
            <label className="text-sm text-white">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="e.g: John"
              autoComplete="given_name" // given name danne first name ek gannakot
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-10 px-4 mt-1 rounded-xl  bg-white border border-boardercolor text-accent placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label className="text-sm text-white">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="e.g: De Silva"
              autoComplete="family_name" //name auto complete venn dana ek ..family-name danne last name ek gannkot
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-10 px-4 mt-1 rounded-xl  bg-white border border-boardercolor text-accent placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-sm text-white">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              autoComplete="current_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-4 mt-1 rounded-xl bg-white border border-boardercolor text-accent placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="text-sm text-white">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-10 px-4 mt-1 rounded-xl  bg-white border border-boardercolor text-accent placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Register Button */}
          <button
            onClick={register}
            className="w-full h-10 rounded-xl bg-gradient-to-r bg-pink text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:bg-pink/70  mt-2"
          >
            Register
          </button>

          {/* Extra Links */}
          <p className="text-sm text-white text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login your account
            </Link>
          </p>
        </div>
      </div>

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 h-full text-white flex-col justify-center items-center px-16 bg-black/30 backdrop-blur-[2px]">
        <img
          src="/logo.png"
          alt="CBC Logo"
          className="w-36 h-36 mb-8 object-cover"
        />
        <h1 className="text-5xl font-bold leading-tight">
          <span className="text-primary">Glow in.</span>{" "}
          <span className="text-pink">Shop on.</span>
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
    </div>
  );
}
