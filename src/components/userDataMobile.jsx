import axios from "axios";
import { useEffect, useState } from "react";
import { Loder } from "./loder";
import { IoMdArrowDropdown } from "react-icons/io";

export default function UserDataMobile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      {isLogoutConfirmOpen && (
        <div className="fixed z-[120] w-full h-screen top-0 left-0 bg-black/40 flex items-center justify-center">
          <div className="w-[350px] bg-primary rounded-xl shadow-xl border border-boardercolor p-6 flex flex-col gap-6">
            <span className="text-xl font-semibold text-secondary text-center">
              Are you sure you want to logout?
            </span>

            <div className="flex justify-between gap-4">
              <button
                className="flex-1 bg-accent text-white font-medium py-2 rounded-lg shadow hover:bg-secondary transition-colors"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Yes
              </button>
              <button
                className="flex-1 bg-accent text-white font-medium py-2 rounded-lg shadow hover:bg-secondary transition-colors"
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                No
              </button>
            </div>

            <button
              className="w-full bg-accent text-white font-medium py-2 rounded-lg shadow hover:bg-secondary transition-colors"
              onClick={() => setIsLogoutConfirmOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="w-[30px] h-[30px] border-[3px] border-white border-b-transparent rounded-full animate-spin"></div>
      )}

      {/* Logged User */}
      {user && (
        <div
          className="flex items-center gap-3 px-3 py-1 rounded-full 
                        bg-primary/60 backdrop-blur-sm shadow-sm 
                        hover:shadow-md transition-all duration-300"
        >
          {/* Profile Image */}
          <img
            src={user.image}
            className="w-10 h-10 rounded-full border-2 border-accent object-cover"
          />

          {/* User Name */}
          <span className="font-medium text-secondary hidden sm:block">
            {user.firstName}
          </span>

          {/* Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-1 rounded-md hover:bg-accent/20 transition"
            >
              <IoMdArrowDropdown className="text-xl text-secondary" />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 flex-col bg-white text-secondary 
              shadow-lg rounded-md overflow-hidden w-32 z-50
              ${dropdownOpen ? "flex" : "hidden"}`}
            >
              <a
                className="px-4 py-2 hover:bg-primary/70 transition cursor-pointer"
                href="/settings"
              >
                Settings
              </a>

              <a
                className="px-4 py-2 hover:bg-primary/70 transition cursor-pointer"
                href="/order"
              >
                Orders
              </a>

              <a
                onClick={() => {
                  setIsLogoutConfirmOpen(true);
                }}
                className="px-4 py-2 hover:bg-primary/70 transition cursor-pointer"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      )}

      {/* If NOT logged in */}
      {!loading && user == null && (
        <a
          href="/login"
          className="text-white px-5 py-2 rounded-full 
                     hover:bg-white/20 transition hover:shadow-md"
        >
          Login
        </a>
      )}
    </div>
  );
}
