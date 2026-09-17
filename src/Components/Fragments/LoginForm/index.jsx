import AuthForm from "@/components/Elements/AuthForm";
import { Link } from "react-router";

const LoginForm = () => {
  return (
    <>
      <section className="w-full px-4">
        <h1 className="text-2xl text-center mt-20">
            Login
        </h1>
        <AuthForm className="mx-auto w-full max-w-100 gap-2 mt-5 border p-5" />
        <p className="text-base text-center mt-2">
            Don't have account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </section>
    </>
  );
};

export default LoginForm;
