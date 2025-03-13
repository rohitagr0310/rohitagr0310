"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import API from "../../config/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Check session on mount
  useEffect(() => {
    axios
      .get(API.API_ENDPOINTS.CHECK_SESSION, { withCredentials: true })
      .then((res) => {
        const role = res.data.role;
        if (localStorage.getItem("role")) {
          localStorage.removeItem("role");
          localStorage.setItem("role", role);
        } else {
          localStorage.setItem("role", role);
        }

        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Redirect based on role
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "consultant") {
          router.push("/consultant");
        } else if (role === "user") {
          router.push("/user");
        }
      })
      .catch(() => {});
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(
        API.API_ENDPOINTS.LOGIN,
        { email, password },
        { withCredentials: true }
      );

      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      const role = res.data.role;

      if (localStorage.getItem("role")) {
        localStorage.removeItem("role");
        localStorage.setItem("role", role);
      } else {
        localStorage.setItem("role", role);
      }

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "consultant") {
        router.push("/consultant");
      } else if (role === "user") {
        router.push("/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden p-8">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-6">
          Login with your site account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] text-black"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB606] text-black"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFB606] text-white px-4 py-2 rounded-md transition hover:bg-yellow-500"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-4">
          Not a member yet?{" "}
          <a
            href="/register"
            className="text-[#FFB606] font-bold hover:underline"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}
