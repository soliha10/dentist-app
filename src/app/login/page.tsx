'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  // User data
  const users = [
    { username: "owner", password: "manager", role: "Manager" },
    { username: "user1", password: "user1", role: "User" },
    { username: "user2", password: "user2", role: "User" },
    { username: "user3", password: "user3", role: "User" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      // Store logged-in user information
      localStorage.setItem('loggedInUser', JSON.stringify({ username: user.username, role: user.role }));

      if (user.username === "owner") {
        router.push("/infos"); // Redirect for the owner
      } else {
        router.push("/infos-user"); // Redirect for regular users
      }
    } else {
      alert("Invalid credentials or role. Please try again.");
    }
  };

  return (
    <div className="my-0 mx-4 sm:mx-10 pt-[100px] sm:pt-[200px]">
      <div className="text-center">
        <h1 className="text-[16px] sm:text-[20px] mb-5">Tanlang</h1>
        <div className="flex justify-around mb-5">
          <button className={`w-[100px] rounded-lg border-2 p-2 border-blue-800 bg-white text-[#009DFF] ${role === "Manager" ? "bg-blue-400 text-white " : ""}`} onClick={() => setRole("Manager")}>
            Manager
          </button>
          <button
            className={`w-[100px] rounded-lg border-2 p-2 border-blue-800 bg-white text-[#009DFF] ${role === "User" ? "bg-blue-400 text-white" : ""}`}
            onClick={() => setRole("User")}
          >
          Ishchi
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          className="p-2 outline-blue-800 text-black rounded-md"
          name="username"
          id="username"
          type="text"
          placeholder="Foydalanuvchi nomi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 outline-blue-800 text-black rounded-md"
          name="password"
          id="password"
          type="password"
          placeholder=" Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="text-right text-[16px] sm:text-[20px] mt-3">
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;