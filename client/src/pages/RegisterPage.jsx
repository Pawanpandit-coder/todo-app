import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../context/LoginContext";

export default function RegisterPage() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/api/auth/register`, form);
      const data = {
        name: response.data.user,
        token: response.data.token,
      };
      localStorage.setItem("data", JSON.stringify(data));
      setForm({
        name: "",
        email: "",
        password: "",
      });
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center gap-4 text-white flex-col p-4">
      <Link to={"/"} className="text-2xl font-black place-self-start p-5">
        Todal
      </Link>
      <div className="w-full max-w-sm bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col items-start">
            <label className="block mb-1 text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none "
            />
          </div>

          {/* Email */}
          <div className="flex flex-col items-start">
            <label className="block mb-1 text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none " // focus:ring-2 focus:ring-white
            />
          </div>

          {/* Password */}
          <div className="flex flex-col items-start">
            <label className="block mb-1 text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition flex justify-center items-center gap-2"
          >
            Register
            {loading && (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            )}
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
