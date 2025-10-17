"use client";
import { useMutation } from "@apollo/client/react";
import { CREATE_STUDENT } from "../../graphql/mutations";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [createStudent, { loading, error, data }] = useMutation(CREATE_STUDENT);

  const StartTestHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both fields");
      return;
    }

    createStudent({
      variables: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log("Student created:", res.data);
        window.location.href = "/test";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#f0f0f0]">
      <div className="bg-[#fff] p-8 rounded-md  mt-[200px] shadow-lg shadow-black/35">
        <h1 className="text-center text-lg font-bold mb-4">
          Start by typing your information
        </h1>
        <form onSubmit={StartTestHandler}>
          <div className="mb-2">
            <label className="block">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="border p-1 w-full outline-none rounded-sm focus:border-blue-500 focus:rounded-md  transition"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              className="border p-1 w-full  rounded-sm  focus:outline-none focus:border-blue-500 focus:rounded-md  transition"
            />
            
            {showPassword ? (
              <EyeIcon
              onClick={() => {
                setShowPassword(!showPassword);
              }}
                className="h-6  w-6  inline ml-2 text-gray-500 absolute right-2 bottom-1.5 cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="h-6  w-6  inline ml-2 text-gray-500 absolute right-2 bottom-1.5 cursor-pointer"
              />
            )}
      
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "starting..." : "Start the Test"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
