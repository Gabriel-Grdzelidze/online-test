'use client'
import { useMutation } from "@apollo/client/react";
import { CREATE_STUDENT } from "../../graphql/mutations";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const { data: session, status } = useSession();
  console.log(session)

  const [createStudent, { loading, error }] = useMutation(CREATE_STUDENT);


  const StartTestHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both fields");
      return;
    }
    createStudent({
      variables: { email, password },
    })
      .then((res) => {
        console.log("Student created:", res.data);
        window.location.href = "/test";
      })
      .catch((err) => console.error(err));
  };

  // Sign In handler (NextAuth)
  const SignInHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      alert(res.error);
    } else {
      window.location.href = "/test";
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f0f0] relative">
      {/* Top-right corner */}
      <div className="absolute top-6 right-8 space-x-3">
        <button
          onClick={() => setShowSignin(true)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <button
          onClick={() => {
            if (status === "loading") return;
            if (session) {
              window.location.href = "/test";
            } else {
              setShowSignup(true);
            }
          }}
          className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
        >
          Sign Up
        </button>
      </div>

      {/* Center Start Test button */}
      <div className="bg-white p-8 rounded-md shadow-lg shadow-black/35 w-[320px] text-center">
        <h1 className="text-lg font-bold mb-4">Start the Test</h1>
        <button
          onClick={() => {
            if (status === "loading") return;
            if (session) {
              window.location.href = "/test";
            } else {
              setShowSignin(true);
            }
          }}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition w-full"
        >
          Start Test
        </button>
      </div>

      {/* Sign Up modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-[#f0f0f0] flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>
            <form onSubmit={StartTestHandler}>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  className="border p-2 w-full rounded-md focus:border-blue-500 outline-none transition"
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="border p-2 w-full rounded-md focus:border-blue-500 outline-none transition"
                />
                {showPassword ? (
                  <EyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-5 w-5 text-gray-500 absolute right-2 bottom-2 cursor-pointer"
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-5 w-5 text-gray-500 absolute right-2 bottom-2 cursor-pointer"
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? "Starting..." : "Sign Up & Start Test"}
              </button>
              {error && <p className="text-red-500 mt-2">{error.message}</p>}
            </form>
            <button
              onClick={() => setShowSignup(false)}
              className="mt-3 w-full text-gray-500 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sign In modal */}
      {showSignin && (
        <div className="fixed inset-0 bg-[#f0f0f0] flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
            <form onSubmit={SignInHandler}>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="border p-2 w-full rounded-md focus:border-blue-500 outline-none transition"
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="border p-2 w-full rounded-md focus:border-blue-500 outline-none transition"
                />
                {showPassword ? (
                  <EyeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-5 w-5 text-gray-500 absolute right-2 bottom-2 cursor-pointer"
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-5 w-5 text-gray-500 absolute right-2 bottom-2 cursor-pointer"
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>
            <button
              onClick={() => setShowSignin(false)}
              className="mt-3 w-full text-gray-500 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
