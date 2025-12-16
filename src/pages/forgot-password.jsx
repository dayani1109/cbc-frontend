import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  //meke piyawara dekak thiyenava 1. email ek type karana ek 2. OTP ek type karana ek
  const [step, setStep] = useState("email"); //me email enter karan ekt adala ek
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  async function sendOTP() {
    //OTP ek send karana function ek
    try {
      await axios.get(
        import.meta.env.VITE_API_URL + "/api/users/send-otp/" + email
      );
      toast.success("OTP sent to your email " + email);
      setStep("otp");
    } catch (e) {
      console.log(e);
      toast.error("Failed to send OTP. Please try again.");
    }
  }

  async function changePassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + "/api/users/change-password",
        {
          email: email,
          otp: otp,
          newPassword: newPassword,
        }
      );
      toast.success(
        "Password changed successfully. Please login with your new password."
      );
      navigate("/login");
    } catch (e) {
      console.error(e);
      toast.error("OTP is incorrect or expired. Please try again.");
      return;
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[url('/cosmatic.jpg')] bg-cover bg-center relative">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {step == "email" && (
        <div className="relative w-[420px] bg-primary/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-boardercolor">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-secondary mb-1">
              Forgot Password
            </h1>
            <p className="text-sm text-secondary/60">
              We’ll send an OTP to reset your password
            </p>
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-4 rounded-xl border border-boardercolor bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />
          {/**email ek type karanna thiyena part ek */}

          <button
            className="w-full h-12 rounded-xl bg-gradient-to-r from-accent to-pink text-white font-semibold hover:opacity-90 transition-all shadow-lg"
            onClick={sendOTP}
          >
            Send OTP
          </button>

          <p className="text-xs text-center text-secondary/50">
            Make sure this email is registered
          </p>
        </div>
      )}

      {step == "otp" && (
        <div className="relative w-[420px] bg-primary/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col gap-4 border border-boardercolor">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-secondary mb-1">
              Reset Password
            </h1>
            <p className="text-sm text-secondary/60">
              Enter OTP and set a new password
            </p>
          </div>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-4 rounded-xl border border-boardercolor bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full p-4 rounded-xl border border-boardercolor bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full p-4 rounded-xl border border-boardercolor bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          <button
            className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-accent to-pink text-white font-semibold hover:opacity-90 transition-all shadow-lg"
            onClick={changePassword}
          >
            Change Password
          </button>

          <p className="text-xs text-center text-secondary/50">
            OTP expires in a few minutes
          </p>
        </div>
      )}
    </div>
  );
}
