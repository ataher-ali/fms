import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useAuth } from "./Auth/AuthContext";

Modal.setAppElement("#root");

const categories = [
  "Travel / Conveyance Allowance",
  "Daily Allowance (DA)",
  "Accommodation / Lodging Charges",
  "Meal / Food Allowance",
  "Local Conveyance",
  "Communication Charges",
  "Printing / Stationery / Courier Charges",
  "Miscellaneous / Others",
  "Advance Adjustment",
  "Project / Client Specific Expenses",
];

export default function DataForm({ activeTab }) {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    email: user?.email || "",
    title: "",
    description: "",
    category: "",
    balance: "",
    amount: "",
  });

  const API_URL = "http://localhost:5000/api";

  // Fetch Data
  const fetchData = async () => {
    try {
      const [expRes, depRes] = await Promise.all([
        axios.get(`${API_URL}/expense`),
        axios.get(`${API_URL}/deposit`),
      ]);
      setExpenses(expRes.data);
      setDeposits(depRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === "expense") {
        if (editItem) {
          await axios.put(`${API_URL}/expense/${editItem._id}`, form);
        } else {
          await axios.post(`${API_URL}/expense`, form);
        }
      } else {
        if (editItem) {
          await axios.put(`${API_URL}/deposit/${editItem._id}`, form);
        } else {
          await axios.post(`${API_URL}/deposit`, form);
        }
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  // Edit Item
  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
    setIsModalOpen(true);
  };

  // Delete Item
  const handleDelete = async (id) => {
    try {
      if (activeTab === "expense") {
        await axios.delete(`${API_URL}/expense/${id}`);
      } else {
        await axios.delete(`${API_URL}/deposit/${id}`);
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // Modal Controls
  const openModal = () => {
    setEditItem(null);
    setForm({
      date: new Date().toISOString().split("T")[0],
      email: user?.email || "",
      title: "",
      description: "",
      category: "",
      balance: "",
      amount: "",
    });
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Calculate Totals (filtered by user email)
  const userExpenses = expenses.filter((item) => item.email === user?.email);
  const userDeposits = deposits.filter((item) => item.email === user?.email);

  const totalExpense = userExpenses.reduce((sum, e) => sum + Number(e.balance), 0);
  const totalDeposit = userDeposits.reduce((sum, d) => sum + Number(d.amount), 0);
  const currentBalance = totalDeposit - totalExpense;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Summary Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-blue-100 p-3 sm:p-4 rounded-lg text-center">
          <h2 className="font-bold text-blue-600 text-sm sm:text-base">Total Expense</h2>
          <p className="text-lg sm:text-xl font-semibold text-blue-800">৳ {totalExpense.toLocaleString()}</p>
        </div>
        <div className="bg-green-100 p-3 sm:p-4 rounded-lg text-center">
          <h2 className="font-bold text-green-600 text-sm sm:text-base">Total Deposit</h2>
          <p className="text-lg sm:text-xl font-semibold text-green-800">৳ {totalDeposit.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg text-center">
          <h2 className="font-bold text-yellow-600 text-sm sm:text-base">Current Balance</h2>
          <p className="text-lg sm:text-xl font-semibold text-yellow-800">৳ {currentBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={openModal}
          className={`px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-semibold text-white text-sm sm:text-base w-full sm:w-auto ${
            activeTab === "expense" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          } transition-colors duration-200`}
        >
          + Add {activeTab === "expense" ? "Expense" : "Deposit"}
        </button>
      </div>

      {/* List - Responsive Table */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow overflow-hidden">
        <h2 className="text-lg font-bold mb-3 text-gray-800">
          {activeTab === "expense" ? "Expense List" : "Deposit List"}
        </h2>
        
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b text-sm text-gray-600 bg-gray-50">
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Title</th>
                {activeTab === "expense" && <th className="p-3 font-medium">Category</th>}
                <th className="p-3 font-medium text-right">Amount</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "expense" ? userExpenses : userDeposits).map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 text-sm text-gray-700 transition-colors duration-150"
                >
                  <td className="p-3">{item.date}</td>
                  <td className="p-3 font-medium">{item.title}</td>
                  {activeTab === "expense" && <td className="p-3 text-gray-600">{item.category}</td>}
                  <td className="p-3 text-right font-semibold">
                    ৳ {activeTab === "expense" ? item.balance : item.amount}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(activeTab === "expense" ? userExpenses : userDeposits).length === 0 && (
                <tr>
                  <td
                    colSpan={activeTab === "expense" ? 5 : 4}
                    className="p-4 text-center text-gray-500"
                  >
                    No {activeTab === "expense" ? "expenses" : "deposits"} found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {(activeTab === "expense" ? userExpenses : userDeposits).map((item) => (
            <div key={item._id} className="border rounded-lg p-3 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
                <span className="font-bold text-lg">
                  ৳ {activeTab === "expense" ? item.balance : item.amount}
                </span>
              </div>
              
              {activeTab === "expense" && (
                <p className="text-sm text-gray-600 mb-2">Category: {item.category}</p>
              )}
              
              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 text-center"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          {(activeTab === "expense" ? userExpenses : userDeposits).length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No {activeTab === "expense" ? "expenses" : "deposits"} found
            </div>
          )}
        </div>
      </div>

      {/* Modal - Responsive */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-4 sm:p-6 mx-4 sm:mx-auto mt-8 sm:mt-24 rounded-lg shadow-lg outline-none w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start sm:items-center p-4 sm:p-0 z-50"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          {editItem
            ? `Edit ${activeTab === "expense" ? "Expense" : "Deposit"}`
            : `Add New ${activeTab === "expense" ? "Expense" : "Deposit"}`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email}
              disabled
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-600 intercursor-not-allowed hidden"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          {activeTab === "expense" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  name="balance"
                  placeholder="Enter amount"
                  value={form.balance}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
            </>
          )}

          {activeTab === "deposit" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter deposit amount"
                value={form.amount}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200 font-medium order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity duration-200 order-1 sm:order-2 ${
                activeTab === "expense" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {editItem ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Modal>

      
    </div>
  );
}