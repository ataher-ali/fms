import React from "react";

import { useNavigate } from "react-router-dom";
export default function Home() {

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard"); // assuming your DataForm page is at /dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex flex-col justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          Welcome, 
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          This is your personal Expense & Deposit Tracker. Track your finances,
          add expenses and deposits, and generate summary reports easily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="font-bold text-blue-600">Track Expenses</h2>
            <p className="text-gray-700 mt-1">Add and monitor your daily expenses.</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="font-bold text-green-600">Track Deposits</h2>
            <p className="text-gray-700 mt-1">Record all your deposits and income.</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h2 className="font-bold text-yellow-600">Generate Reports</h2>
            <p className="text-gray-700 mt-1">Print PDF summaries of your finances.</p>
          </div>
        </div>

        <button
          onClick={goToDashboard}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Go to Dashboard
        </button>

        <p className="mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} Your Finance Tracker App
        </p>
      </div>

    </div>
  );
}
