import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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
    <div className="flex items-center justify-center h-full relative z-[200]">
      {loading && (
        <div className="w-[30px] h-[30px] border-[3px] border-white border-b-transparent rounded-full animate-spin"></div>
      )}

      {user && (
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-primary/60 backdrop-blur-sm shadow-sm">
          <img
            src={user.image}
            className="w-10 h-10 rounded-full border-2 border-accent object-cover"
          />

          <span className="font-medium text-secondary hidden sm:block">
            {user.firstName}
          </span>

          <button
            className="p-1 rounded-md hover:bg-accent/20 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <IoMdArrowDropdown className="text-xl text-secondary" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-[70px] right-0 flex flex-col bg-white text-secondary shadow-xl rounded-md w-32 z-[99999]">
              <a
                className="px-4 py-2 hover:bg-primary/70 transition"
                href="/settings"
              >
                Settings
              </a>
              <a
                className="px-4 py-2 hover:bg-primary/70 transition"
                href="/orders"
              >
                Orders
              </a>
              <button
                className="text-left px-4 py-2 hover:bg-primary/70 transition"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsLogoutConfirmOpen(true);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && user == null && (
        <a
          href="/login"
          className="text-white px-5 py-2 rounded-full hover:bg-white/20 transition"
        >
          Login
        </a>
      )}

      {isLogoutConfirmOpen && (
        <div className="fixed z-[100000] w-full h-screen top-0 left-0 bg-black/40 flex items-center justify-center">
          <div className="w-[350px] bg-primary rounded-xl shadow-xl p-6 flex flex-col gap-6">
            <span className="text-xl font-semibold text-secondary text-center">
              Are you sure you want to logout?
            </span>

            <div className="flex gap-4">
              <button
                className="flex-1 bg-accent text-white py-2 rounded-lg"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Yes
              </button>
              <button
                className="flex-1 bg-accent text-white py-2 rounded-lg"
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
