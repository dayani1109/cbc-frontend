import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  DollarSign,
  ShieldAlert,
  CheckCircle,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Loder } from "../../components/loder";
import { Link } from "react-router-dom";


/* ---------------- 3D GLASS STAT CARD ---------------- */
const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -10, rotateX: 5, rotateY: -2 }}
    className="relative p-6 rounded-[2rem] bg-white border border-boardercolor/20 shadow-[0_15px_40px_rgba(193,133,109,0.12)] overflow-hidden"
    style={{ transformStyle: "preserve-3d" }}
  >
    <div
      className={`absolute -right-2 -top-2 w-20 h-20 rounded-full opacity-5 ${colorClass}`}
    />
    <div className="flex items-center gap-5 relative z-10">
      <div
        className={`p-4 rounded-2xl ${colorClass} text-white shadow-lg shadow-black/5`}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-secondary/50 text-[10px] font-black uppercase tracking-widest">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-secondary tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const [data, setData] = useState({ products: [], users: [], orders: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({
    revenue: 0,
    stockAlert: 0,
    blockedUsers: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const [prodRes, userRes, orderRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/api/products"),
          axios.get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
            headers,
          }),
          axios.get(import.meta.env.VITE_API_URL + "/api/orders", { headers }),
        ]);

        const products = prodRes.data;
        const users = userRes.data;
        const orders = orderRes.data;

        setData({ products, users, orders });

        // Calculate Stats
        setSummary({
          revenue: orders.reduce((acc, curr) => acc + (curr.total || 0), 0),
          stockAlert: products.filter((p) => p.stock < 10).length,
          blockedUsers: users.filter((u) => u.isBlock).length,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Dashboard Load Error", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loder />
      </div>
    );

  return (
    <div className="min-h-screen p-6 md:p-10 font-sans text-secondary">
      {/* --- TOP HEADER --- */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-boardercolor/10 pb-8">
        <div>
          <h1 className="text-3xl  font-bold tracking-tighter mb-6">
            System <span className="text-accent">Insights</span>
          </h1>
          <p className="text-secondary/50 font-bold mt-1 uppercase text-xs tracking-widest">
            Control Panel • Real-time Data
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-secondary/40 uppercase">
              Active Admin
            </p>
            <p className="text-sm font-bold text-accent">Root Administrator</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary border-2 border-boardercolor/30 flex items-center justify-center text-accent shadow-inner">
            <LayoutDashboard size={24} />
          </div>
        </div>
      </header>

      {/* --- 3D STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Revenue"
          value={`Rs. ${summary.revenue.toLocaleString()}`}
          icon={DollarSign}
          colorClass="bg-accent"
          delay={0.1}
        />
        <StatCard
          title="Active Users"
          value={data.users.length}
          icon={Users}
          colorClass="bg-secondary"
          delay={0.2}
        />
        <StatCard
          title="Inventory"
          value={data.products.length}
          icon={ShoppingBag}
          colorClass="bg-pink"
          delay={0.3}
        />
        <StatCard
          title="Stock Alerts"
          value={summary.stockAlert}
          icon={AlertCircle}
          colorClass="bg-orange-500"
          delay={0.4}
        />
      </div>

      {/* --- BENTO BOX CHARTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-primary/30 p-8 rounded-[2.5rem] border border-boardercolor/20"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-accent" /> Sales Performance
            </h3>
            <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full border border-boardercolor/30 uppercase">
              Last 10 Orders
            </span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.orders.slice(-10)}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9A3F3F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9A3F3F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#C1856D33"
                />
                <XAxis dataKey="orderID" hide />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#212121", fontSize: 10, fontWeight: "900" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "20px",
                    border: "1px solid #C1856D",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    fontWeight: "bold",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#9A3F3F"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorAcc)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Security & User Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-secondary p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden"
        >
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldAlert className="text-pink" /> Security Hub
            </h3>

            <div className="space-y-6 flex-1">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                <p className="text-[10px] font-bold text-pink uppercase tracking-[0.2em] mb-1">
                  Risk Management
                </p>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Blocked Users</span>
                  <span className="text-2xl font-bold text-pink">
                    {summary.blockedUsers}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">
                  Verification
                </p>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Verified Accounts</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    {data.users.filter((u) => u.isEmailVerified).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button className="w-full py-4 bg-accent rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-boardercolor transition-all active:scale-95 shadow-xl shadow-black/20">
                System Security Audit
              </button>
            </div>
          </div>
          {/* Background Decorative Shape */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 blur-[80px] rounded-full" />
        </motion.div>
      </div>

      {/* --- QUICK ACTION STRIP --- */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Product Inventory",
            count: data.products.length,
            link: "/admin/products",
            icon: Package,
          },
          {
            label: "Client Database",
            count: data.users.length,
            link: "/admin/users",
            icon: Users,
          },
          {
            label: "Order History",
            count: data.orders.length,
            link: "/admin/orders",
            icon: CheckCircle,
          },
        ].map((action, i) => (
          <Link to={action.link} key={i}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-between p-5 bg-white rounded-3xl border border-boardercolor/20 hover:border-accent/40 transition-all cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-xl text-accent">
                  <action.icon size={20} />
                </div>
                <div>
                  <p className="font-black text-secondary text-sm">
                    {action.label}
                  </p>
                  <p className="text-[10px] text-secondary/40 font-bold uppercase">
                    {action.count} Total Records
                  </p>
                </div>
              </div>

              <ChevronRight size={18} className="text-boardercolor" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
