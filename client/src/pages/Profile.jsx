import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          className="rounded-lg border p-3"
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          className="rounded-lg border p-3"
          placeholder="email"
          id="emial"
        />
        <input
          type="text"
          className="rounded-lg border p-3"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-95">
          Update
        </button>
      </form>
      <div className="flex mt-5 justify-between">
        <span className="text-red-700">Delete account</span>
        <span className="text-red-700">Sign out</span>
      </div>
    </div>
  );
}
