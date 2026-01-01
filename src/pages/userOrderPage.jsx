import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import Footer from "../components/footer";
import { Loder } from "../components/loder";


export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const downloadInvoice = async (order) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // ---------- Settings ----------
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let y = 60;

    // ---------- Logo ----------
    const logoWhiteBase64 = "/logo.png";
    // Replace with your white logo base64
    doc.addImage(logoWhiteBase64, "PNG", margin, 20, 80, 40);

    // ---------- Header ----------
    doc.setFontSize(24);
    doc.setTextColor(154, 63, 63);
    doc.setFont("helvetica", "bold");
    doc.text("Crystal Beauty Clear", pageWidth / 2, 50, { align: "center" });

    // ---------- Customer Info ----------
    const lineHeight = 20; // vertical space between lines

    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.setFont("helvetica", "normal");

    y += lineHeight * 2;

    doc.text(`Order ID: ${order.orderID}`, margin, y);
    doc.text(
      `Date: ${new Date(order.date).toLocaleDateString()}`,
      pageWidth - margin,
      y,
      { align: "right" }
    );

    y += lineHeight;
    doc.text(`Customer: ${order.customerName}`, margin, y);

    y += lineHeight;
    doc.text(`Email: ${order.email}`, margin, y);

    y += lineHeight;
    doc.text(`Phone: ${order.phone}`, margin, y);

    y += lineHeight;
    doc.text(`Address: ${order.address}`, margin, y);

    y += lineHeight * 2; // extra space before products/cards

    // ---------- Products as Cards ----------
    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];

      // Card background
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(margin, y, pageWidth - 2 * margin, 60, 8, 8, "F");

      // Product Image
      if (item.image) {
        try {
          const img = new Image();
          img.src = item.image;
          await new Promise((resolve) => {
            img.onload = () => {
              doc.addImage(img, "JPEG", margin + 10, y + 5, 50, 50);
              resolve();
            };
            img.onerror = resolve; // skip if image fails
          });
        } catch (e) {}
      }

      // Product Details
      doc.setFontSize(12);
      doc.setTextColor(33);
      doc.text(item.name, margin + 70, y + 20);
      doc.text(`Qty: ${item.quantity}`, margin + 70, y + 35);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(154, 63, 63);
      doc.text(
        `Rs. ${item.price * item.quantity}`,
        pageWidth - margin - 50,
        y + 25
      );

      y += 70;

      // Add new page if exceeding
      if (y > 700) {
        doc.addPage();
        y = 60;
      }
    }

    // ---------- Grand Total ----------
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(154, 63, 63);
    doc.text(`Grand Total: Rs. ${order.total}`, margin, y + 20);

    // ---------- Footer ----------
    doc.setDrawColor(154, 63, 63);
    doc.setLineWidth(0.5);
    doc.line(margin, 780, pageWidth - margin, 780);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for your order!", pageWidth / 2, 790, {
      align: "center",
    });
    doc.text(
      "Crystal Beauty Clear | www.crystalbeautyclear.com",
      pageWidth / 2,
      805,
      { align: "center" }
    );

    // ---------- Save PDF ----------
    doc.save(`${order.orderID}_invoice.pdf`);
  };

  return (
    <>
      

      <div className="min-h-screen bg-primary p-6">
        <h1 className="text-3xl font-bold text-accent mb-6 text-center">
          My Orders
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loder />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-secondary/70 py-12">
            You have no orders yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.orderID}
                className="bg-white rounded-2xl shadow-lg flex flex-col justify-between p-4 hover:shadow-2xl transition duration-300 min-h-[420px]"
              >
                <div>
                  <h2 className="font-bold text-secondary text-lg mb-2">
                    {order.orderID}
                  </h2>

                  <div className="mb-4 flex flex-col gap-2 max-h-48 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 border-b border-boardercolor py-2 last:border-b-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-secondary font-medium">
                            {item.name}
                          </p>
                          <p className="text-sm text-secondary">
                            {item.quantity} x Rs.{item.price} = Rs.
                            {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 text-secondary">
                    <p>
                      <span className="font-semibold">Customer:</span>{" "}
                      {order.customerName}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {order.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {order.address}
                    </p>
                    <p className="font-semibold mt-2">
                      Total: Rs. {order.total}
                    </p>
                    <p className="text-sm mt-1 text-secondary/70">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => downloadInvoice(order)}
                  className="bg-accent text-white py-2 rounded-xl hover:bg-accent/90 transition mt-auto"
                >
                  Download Invoice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
