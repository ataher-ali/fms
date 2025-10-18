import React, { useState } from 'react';
import DataForm from './DataForm';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("expense");
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto px-4 mb-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-50 h-16 bg-gradient-to-r from-blue-400  to-blue-500 rounded-2xl shadow-lg mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent mb-3">
                        Financial Tracker
                    </h1>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Manage your expenses and deposits in one place
                    </p>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    
                    {/* Tab Navigation */}
                    <div className="flex bg-gray-50/80 p-2 m-4 rounded-xl">
                        <button
                            onClick={() => setActiveTab("expense")}
                            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                                activeTab === "expense"
                                    ? "bg-white text-red-600 shadow-lg border border-red-100 transform scale-105"
                                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                            }`}
                        >
                            <svg className={`w-5 h-5 ${activeTab === "expense" ? "text-red-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>Add Expense</span>
                        </button>
                        
                        <button
                            onClick={() => setActiveTab("deposit")}
                            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                                activeTab === "deposit"
                                    ? "bg-white text-green-600 shadow-lg border border-green-100 transform scale-105"
                                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                            }`}
                        >
                            <svg className={`w-5 h-5 ${activeTab === "deposit" ? "text-green-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Add Deposit</span>
                        </button>
                    </div>

                    {/* Form Section */}
                    <div className="p-6">
                        <div className="mb-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`w-3 h-3 rounded-full ${activeTab === "expense" ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {activeTab === "expense" ? 'Record New Expense' : 'Record New Deposit'}
                                </h2>
                            </div>
                            <p className="text-gray-600 text-sm">
                                {activeTab === "expense" 
                                    ? 'Track where your money goes and manage your spending wisely.'
                                    : 'Record your income and keep track of your financial growth.'
                                }
                            </p>
                        </div>
                        
                        <DataForm activeTab={activeTab} />
                    </div>
                </div>

                {/* Quick Stats Preview */}
                {/* <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                        <div className="text-red-500 text-sm font-medium">Total Expenses</div>
                        <div className="text-2xl font-bold text-gray-800">- $0.00</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                        <div className="text-green-500 text-sm font-medium">Total Deposits</div>
                        <div className="text-2xl font-bold text-gray-800">+ $0.00</div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;