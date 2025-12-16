import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Loder } from "../../components/loder";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";

function UserBlockConfirm(props) {
  const email = props.user.email;
  const close = props.close;
  const refresh = props.refresh;

  function blockUser() {
    const token = localStorage.getItem("token");

    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/block/" + email,
        {
          isBlock: !props.user.isBlock,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("User block status changed Successfully");
        refresh();
      })
      .catch(() => {
        toast.error("Failed to change user block status");
      });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex justify-center items-center px-4">
      <div className="bg-primary rounded-2xl shadow-xl w-full max-w-md relative p-6">
        {/* Close button (top-right) */}
        <button
          onClick={close}
          className="absolute top-[-42px] right-[-42px] w-[40px] h-[40px] bg-white hover:bg-red-500 rounded-full flex justify-center items-center"
        >
          <IoClose className="text-gray-700 text-lg" />
        </button>

        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            <FaLock className="text-2xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">
          Block User
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to {props.user.isBlock?"Unblock":"Block"} the user with email {""}
          <span className="font-bold">{email}</span>?
        </p>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={close}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={blockUser}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null); //delete karann ona product id ek
  const [isLoading, setIsLoading] = useState(true); //patam ganiddi loading vevi thiyenne e nisa true

  const navigate = useNavigate();

  useEffect(() => {
    //mek run venne page ek mul vathavt load venkot vitrayi

    if (isLoading) {
      //loading vemin thiyenvanm vitrak me ek parak run karann kiyanva
      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("Please login to access admin panel");
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
          setIsLoading(false); //methan me anvashsha vidiyt 2parak run venva e nisa uda if ek danva
        });
    }
  }, [isLoading]); //array ekt dann puluvam climary variable vitryi, numbers, string, boolean anith evat weda karanne na
  //isLoading ek haddissiye hari venas vunoth me function ek aye run venva

  return (
    <div className="w-full h-full p-6 bg-primary">
      {isBlockConfirmVisible && (
        <UserBlockConfirm
          refresh={() => {
            setIsLoading(true);
          }}
          user={userToBlock}
          close={() => {
            setIsBlockConfirmVisible(false);
          }}
        />
      )}

      <h1 className="text-3xl font-bold text-accent mb-6">User Management</h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-boardercolor">
        {isLoading ? (
          <Loder />
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-accent text-white">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">First Name</th>
                <th className="py-3 px-4">Last Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-boardercolor bg-white">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-primary">
                  <td className="py-3 px-4">
                    <img
                      src={user.image}
                      referrerPolicy="no-referrer" // google login profile image ek pennanne mehem demmoth vitrayi
                      alt={user.firstName}
                      className={`w-14 h-14 rounded-full object-cover border-2 p-1 ${
                        user.isBlock ? "border-red-600" : "border-green-600"
                      }`}
                    />
                  </td>

                  <td className="py-3 px-4">
                    {user.email}
                    {user.isEmailVerified && (
                      <MdVerified className="inline ml-1 text-blue-500" />
                    )}
                  </td>

                  <td className="py-3 px-4 font-semibold">{user.firstName}</td>

                  <td className="py-3 px-4 font-semibold">{user.lastName}</td>

                  {/* ===== ROLE COLOR BADGE ===== */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1
                        ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                    >
                      {user.role === "admin" && <MdOutlineAdminPanelSettings />}
                      {user.role}
                    </span>
                  </td>

                  {/* ===== BLOCK / UNBLOCK ===== */}
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setUserToBlock(user); //block userv select karagannva
                          setIsBlockConfirmVisible(true);
                        }}
                        className={`p-2 rounded-full ${
                          user.isBlock
                            ? "text-green-600 hover:bg-green-100"
                            : "text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {user.isBlock ? <FaLockOpen /> : <FaLock />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    No Users to display
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
