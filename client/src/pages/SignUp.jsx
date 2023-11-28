import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Sign up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="boader p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="boader p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="boader p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
        {/* <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
        Sign up with google
      </button> */}
      </form>
      <div className="mt-5">
        <span>Have an account? </span>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
