import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded font-semibold">
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          New here?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
