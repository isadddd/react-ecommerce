import Button from "@/components/Elements/Button";

const AuthForm = ({ className }) => {
  const HandleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("username", event.target.username.value);
    localStorage.setItem("password", event.target.password.value);
    window.location.href = "/shop";
    // console.log(event.target.username.value);
    // console.log(event.target.password.value);
  };

  return (
    <>
      <form
        className={`flex flex-col gap-2 ${className}`}
        onSubmit={HandleLogin}
      >
        <label htmlFor="username">Username</label>
        <input
          className="border py-2 px-3"
          type="text"
          name="username"
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          className="border py-2 px-3"
          type="password"
          name="password"
          placeholder="********"
        />
        <Button className="mt-5 cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default AuthForm;
