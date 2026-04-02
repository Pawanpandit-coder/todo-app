import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function LoginPage() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    value: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError({
      state: false,
      value: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/api/auth/login`, form);

      const data = {
        name: res.data.user,
        token: res.data.token,
      };
      localStorage.setItem("data", JSON.stringify(data));
      setForm({
        email: "",
        password: "",
      });
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError({
        state: true,
        value: err.response?.data?.message || "Something went wrong",
      });
      // console.error(err);
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
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error.state && (
            <div className="py-1 border-red-500 w-full text-red-500 text-start px-1 outline">
              {error.value}
            </div>
          )}
          {/* Email */}
          <div className="flex flex-col items-start">
            <label className="block mb-1 text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none" // focus:ring-2 focus:ring-white
              required
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none "
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition flex justify-center items-center gap-2"
          >
            Login
            {loading && (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            )}
          </button>
        </form>

        {/* Extra */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-white cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
