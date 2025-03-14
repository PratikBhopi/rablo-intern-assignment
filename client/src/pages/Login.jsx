import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();
  // Email validation schema using Yup
  const emailSchema = yup.string().email("Invalid email format").required("Email is required");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await emailSchema.validate(email);
      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)
      if (!data.success) throw new Error(data.message || "Invalid credentials");
      console.log("Login Successful:", data);
      navigate('/dashboard');
      alert("Login Successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">Login</h3>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          <div className="pt-2 text-center">
          <a href="/register" className="text-blue-500 hover:underline">
            create account
          </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
