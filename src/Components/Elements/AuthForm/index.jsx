import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import Button from "@/components/Elements/Button";
import { useAuth } from "@/context/AuthContext";

const AuthForm = ({ className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    setLoading(true);
    setError("");

    try {
      await login(username, password);

      const from = location.state?.from?.pathname || "/shop";

      navigate(from, { replace: true });
    } catch (error) {
      switch (error.code) {
        case "INVALID_CREDENTIALS":
          setError("Username atau password salah.");
          break;

        case "NETWORK_ERROR":
          setError("Tidak dapat terhubung ke server.");
          break;

        case "SERVER_ERROR":
          setError("Server sedang bermasalah. Silakan coba lagi.");
          break;

        case "UNAUTHORIZED":
          setError("Anda tidak memiliki akses.");
          break;

        default:
          setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`flex flex-col gap-2 ${className}`} onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>

      <input
        className="border px-3 py-2"
        type="text"
        name="username"
        placeholder="Username"
        required
        autoComplete="current-password"
        disabled={loading}
      />

      <label htmlFor="password">Password</label>

      <div className="relative">
        <input
          id="password"
          className="w-full border px-3 py-2 pr-20"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="********"
          required
          autoComplete="current-password"
          disabled={loading}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-900"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button className="mt-5 cursor-pointer" type="submit" disabled={loading}>
        {loading ? "Login..." : "Submit"}
      </Button>
    </form>
  );
};

export default AuthForm;
