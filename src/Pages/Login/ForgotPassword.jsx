// ForgotPassword.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Auth/AuthContext"; // Adjust path to your auth instance
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      await sendPasswordResetEmail(auth, email);
      
      setEmailSent(true);
      toast.success("Password reset email sent successfully!");
      setEmail("");
      
    } catch (err) {
      let errorMessage = "Failed to send reset email. Please try again.";
      
      // Handle specific Firebase auth errors
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
        default:
          errorMessage = err.message || "An error occurred. Please try again.";
      }
      
      setError(errorMessage);
      toast.error("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
          <p className="text-gray-600 mt-2">
            {emailSent 
              ? "Check your email for reset instructions" 
              : "Enter your email and we'll send you a link to reset your password"
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {emailSent ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-semibold">Email Sent Successfully!</p>
              <p className="text-sm mt-1">
                We've sent a password reset link to your email address. 
                Please check your inbox and follow the instructions.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleBackToLogin}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Back to Login
              </button>
              
              <p className="text-gray-600 text-sm">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setEmailSent(false)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}

        {/* Additional Help Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Need help?</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure you entered the correct email address</li>
            <li>• Contact support if you continue having issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}