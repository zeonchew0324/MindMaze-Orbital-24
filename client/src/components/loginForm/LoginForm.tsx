import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/home");
      } catch (error) {
        if (error instanceof Error) {
          alert("Error: Invalid credentials");
        }
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className="flex w-svw h-screen bg-gradient-to-r from-blue-200 to-orange-500">
      <div className="m-auto bg-white rounded-xl shadow-lg flex max-w-4xl">
        <div className="min-w-[30vw] p-8">
          <h2 className="text-2xl font-bold mb-2">MindMaze</h2>
          <h3 className="text-gray-400 mb-6">Welcome back !!!</h3>
          <h1 className="text-3xl font-bold mb-6">Log In</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="login@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className={`w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300 ${
                isSigningIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSigningIn}
            >
              {isSigningIn ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;