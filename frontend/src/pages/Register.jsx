import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            className="w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold">
            Register
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
