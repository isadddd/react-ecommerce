import Button from "@/components/Elements/Button";
import { login } from "@/services/auth";

const AuthForm = ({ className }) => {
  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const data = await login(username, password);

      console.log(data);

      localStorage.setItem("accessToken", data.accessToken);

      window.location.href = "/shop";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className={`flex flex-col gap-2 ${className}`} onSubmit={handleLogin}>
      <label htmlFor="username">Username1</label>

      <input
        className="border px-3 py-2"
        type="text"
        name="username"
        placeholder="Username"
        required
      />

      <label htmlFor="password">Password</label>

      <input
        className="border px-3 py-2"
        type="password"
        name="password"
        placeholder="********"
        required
      />

      <Button className="mt-5 cursor-pointer" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AuthForm;
