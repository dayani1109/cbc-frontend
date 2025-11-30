import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const statusBadgeClass = (status) => {
  const base =
    "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold";

  switch ((status || "").toLowerCase()) {
    case "paid":
    case "completed":
      return `${base} bg-green-500/10 text-green-600`;

    case "processing":
    case "shipped":
      return `${base} bg-blue-500/10 text-blue-600`;

    case "cancelled":
    case "canceled":
      return `${base} bg-red-500/10 text-red-600`;

    case "refunded":
      return `${base} bg-yellow-500/10 text-yellow-600`;

    case "pending":
      return `${base} bg-purple-500/10 text-purple-600`;

    default:
      return `${base} bg-accent/10 text-accent`;
  }
};

const formatLKR = (n) =>
  new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
    n ?? 0
  );

export default function OrderModal({
  isModalOpen,
  selectedOrder,
  closeModal,
  refresh,
}) {
  const [status, setStatus] = useState(selectedOrder?.status);

  if (!isModalOpen || !selectedOrder) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center 
      bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={closeModal}
    >
      <div
        className="relative w-[92vw] max-w-3xl rounded-3xl 
        bg-primary shadow-2xl border border-boardercolor/40 
        animate-scaleIn overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-boardercolor/40 bg-white/50 backdrop-blur">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-secondary tracking-wide">
                Order #{selectedOrder.orderID}
              </h2>

              <div className="flex items-center gap-2 mt-1 text-sm text-secondary/70">
                <span className={statusBadgeClass(selectedOrder.status)}>
                  {selectedOrder.status}
                </span>
                <span>•</span>
                <span>{new Date(selectedOrder.date).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="text-secondary/60 hover:text-secondary bg-white p-2 rounded-xl shadow-sm border border-boardercolor/40"
            >
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto bg-primary">
          {/* CUSTOMER + PAYMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* CUSTOMER CARD */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-boardercolor/30">
              <h3 className="text-sm font-semibold text-secondary mb-3">
                Customer Details
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-secondary/60">Name</span>
                  <span className="font-medium">
                    {selectedOrder.customerName}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-secondary/60">Email</span>
                  <span className="font-medium">{selectedOrder.email}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-secondary/60">Phone</span>
                  <span className="font-medium">{selectedOrder.phone}</span>
                </li>
                <li className="flex justify-between items-start">
                  <span className="text-secondary/60">Address</span>
                  <span className="font-medium max-w-[60%] text-right">
                    {selectedOrder.address}
                  </span>
                </li>
              </ul>
            </div>

            {/* PAYMENT CARD */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-boardercolor/30">
              <h3 className="text-sm font-semibold text-secondary mb-3">
                Payment Summary
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-secondary/60">Items</span>
                  <span className="font-medium">
                    {selectedOrder.items?.length}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-secondary/60">Total</span>
                  <span className="font-bold text-accent">
                    {formatLKR(selectedOrder.total)}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* ITEMS LIST */}
          <div className="mt-6 bg-white rounded-2xl shadow-md border border-boardercolor/30">
            <div className="px-4 py-3 font-semibold border-b border-boardercolor/30 text-secondary">
              Order Items
            </div>

            <ul className="divide-y divide-boardercolor/20">
              {selectedOrder.items.map((it) => {
                const lineTotal = it.quantity * it.price;
                return (
                  <li
                    key={it.productID}
                    className="flex gap-4 px-4 py-4 items-center hover:bg-primary/40 transition"
                  >
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-16 h-16 rounded-xl object-cover border border-boardercolor/20 shadow-sm"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-secondary truncate">
                          {it.name}
                        </p>

                        <span className="text-sm text-secondary/60">
                          {formatLKR(it.price)}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs mt-1 text-secondary/60">
                        <span>PID: {it.productID}</span>
                        <span>Qty: {it.quantity}</span>
                        <span className="font-semibold text-secondary">
                          {formatLKR(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-white/60 backdrop-blur border-t border-boardercolor/40 flex justify-between items-center">
          <span className="text-sm text-secondary/60">
            {selectedOrder.items?.length} items •{" "}
            {formatLKR(selectedOrder.total)}
          </span>

          <div className="flex items-center gap-3">
            <select
              defaultValue={selectedOrder.status}
              onChange={(e) => setStatus(e.target.value)}
              className="
                rounded-xl border border-boardercolor/40 bg-white
                px-3 py-2 text-sm text-secondary shadow-sm
                focus:ring-2 focus:ring-accent/30 focus:border-accent
              "
            >
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
              <option value="pending">Pending</option>
            </select>

            <button
              onClick={() => {
                const token = localStorage.getItem("token");

                axios
                  .put(
                    `${import.meta.env.VITE_API_URL}/api/orders/status/${
                      selectedOrder.orderID
                    }`,
                    { status },
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                  .then(() => {
                    toast.success("Order status updated");
                    closeModal();
                    refresh(); // table updates here
                  })
                  .catch(() => toast.error("Failed to update"));
              }}
              disabled={status === selectedOrder.status}
              className="bg-accent text-white px-4 py-2 font-semibold rounded-xl shadow hover:opacity-90 transition disabled:opacity-40"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
