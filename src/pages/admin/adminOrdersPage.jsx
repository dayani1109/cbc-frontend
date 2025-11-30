import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loder } from "../../components/loder";
import OrderModal, { statusBadgeClass } from "../../components/orderInfoModel";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModelOpen, setIsModelOpen] = useState(false); //order model ek open karana use state ek
  const [selectedOrder, setSelectedOrder] = useState(null); //select order ek ganna use state ek

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (token == null) {
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-primary">
      <OrderModal
        isModalOpen={isModelOpen}
        selectedOrder={selectedOrder}
        closeModal={() => setIsModelOpen(false)}
        refresh={() => setIsLoading(true)}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-accent">Order Management</h1>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-boardercolor">
        {isLoading ? (
          <div className="w-full py-20 flex justify-center">
            <Loder />
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-accent text-white font-bold">
              <tr>
                <th className="py-3 px-4 text-sm font-medium">Order ID</th>
                <th className="py-3 px-4 text-sm font-medium">
                  Number of Items
                </th>
                <th className="py-3 px-4 text-sm font-medium">Customer</th>
                <th className="py-3 px-4 text-sm font-medium">Email</th>
                <th className="py-3 px-4 text-sm font-medium">Phone</th>
                <th className="py-3 px-4 text-sm font-medium">Address</th>
                <th className="py-3 px-4 text-sm font-medium">Total</th>
                <th className="py-3 px-4 text-sm font-medium">Status</th>
                <th className="py-3 px-4 text-sm font-medium">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-boardercolor bg-white">
              {orders.map((item) => (
                <tr
                  key={item.orderID}
                  className="hover:bg-primary/20 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedOrder(item);
                    setIsModelOpen(true);
                  }}
                >
                  <td className="py-3 px-4 font-semibold text-secondary">
                    {item.orderID}
                  </td>
                  <td className="py-3 px-4 text-secondary">
                    {item.items.length} items
                  </td>
                  <td className="py-3 px-4 text-secondary font-medium">
                    {item.customerName}
                  </td>
                  <td className="py-3 px-4 text-secondary">{item.email}</td>
                  <td className="py-3 px-4 text-secondary">{item.phone}</td>
                  <td className="py-3 px-4 text-secondary">{item.address}</td>
                  <td className="py-3 px-4 text-secondary font-semibold">
                    {item.total}
                  </td>
                  <td className="py-5 px-3">
                    <span className={statusBadgeClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-secondary">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-12 text-center text-secondary/60"
                    colSpan={9}
                  >
                    No orders to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
