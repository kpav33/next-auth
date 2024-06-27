"use client";

import React, { useState } from "react";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setError(false);

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Account created successfully!");
      } else {
        setMessage("Failed to create account.");
        setError(true);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setMessage("An error occurred.");
      setError(true);
    }
  };

  //   return (
  //     <div>
  //       <form onSubmit={handleSubmit}>
  //         <div>
  //           <label htmlFor="name">Name:</label>
  //           <input
  //             type="text"
  //             id="name"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="email">Email:</label>
  //           <input
  //             type="email"
  //             id="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="password">Password:</label>
  //           <input
  //             type="password"
  //             id="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <button type="submit">Create Account</button>
  //       </form>
  //       {message && <p>{message}</p>}
  //     </div>
  //   );

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm ${
            error ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
