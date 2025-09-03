import { Link, Route, Routes } from "react-router-dom";
import { HiOutlineUserAdd, HiOutlineUsers } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendarTimes, FaRegMoneyBillAlt } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import {
  MdOutlineFeedback,
  MdOutlineVerifiedUser,
  MdSpeed,
} from "react-icons/md";
import { BiSupport } from "react-icons/bi";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-accent flex p-2">
      <div className="w-[300px] h-full bg-accent flex flex-col items-center gap-[20px]">
        <div className="flex flex-row w-[90%] h-[70px]  items-center rounded-2xl mb-[20px]">
          <img
            src="/logo.jpg"
            alt="ITGuru- e-Tution Platform"
            className="h-[70px] rounded-full
            "
          />
          <span className="text-white text-2xl font-semibold  ml-4">
            Admin Panel
          </span>
        </div>

        <Link
          to="/admin"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <LuLayoutDashboard className="text-xl" />
          Dashboard
        </Link>

        <Link
          to="/admin/orders"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <FiUsers className="text-xl" />
          Manage Users
        </Link>

        <Link
          to="/admin/products"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <HiOutlineUserAdd className="text-xl" />
          Manage Staff
        </Link>

        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <FaRegMoneyBillAlt className="text-xl" />
          Manage Payment
        </Link>

        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <TfiAnnouncement className="text-xl" />
          Manage Announcement
        </Link>

        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <MdOutlineVerifiedUser className="text-xl" />
          Manage Enrollment
        </Link>

        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <FaRegCalendarTimes className="text-xl" />
          Manage Time Table
        </Link>

        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <MdSpeed className="text-xl" />
          Manage Performance
        </Link>

        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <MdOutlineFeedback className="text-xl" />
          Manage Feedback
        </Link>

        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <BiSupport className="text-xl" />
          Manage Support Ticket
        </Link>
      </div>

      <div className="w-[calc(100%-300px)] h-full border-[4px] border-boardercolor bg-primary rounded-[20px] overflow-hidden">
        {/*w-> meke width eka sampurana with ekem (100%) adu karann 300px. calcuylation part danne calc() athule */}
        <div className=" w-full max-w-full h-full max-h-full overflow-y-scroll">
          <Routes path="/">
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/products" element={<h1>Dashboard</h1>} />
            <Route path="/orders" element={<h1>Dashboard</h1>} />
            <Route path="/add-product" element={<h1>Dashboard</h1>} />
            <Route path="/update-product" element={<h1>Dashboard</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
