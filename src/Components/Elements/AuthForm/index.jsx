import { useState } from "react";
import Button from "@/components/Elements/Button";
import { getCurrentUser, login } from "@/services/auth";

const AuthForm = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    setLoading(true);
    setError("");

    try {
      const data = await login(username, password);

      console.log("LOGIN:", data);

      localStorage.setItem("accessToken", data.accessToken);

      const user = await getCurrentUser();

      console.log("CURRENT USER:", user);

      // window.location.href = "/shop"
    } catch (error) {
      switch (error.message) {
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
        disabled={loading}
      />

      <label htmlFor="password">Password</label>

      <input
        className="border px-3 py-2"
        type="password"
        name="password"
        placeholder="********"
        required
        disabled={loading}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button className="mt-5 cursor-pointer" type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Submit"}
      </Button>
    </form>
  );
};

export default AuthForm;
