import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";

function Login() {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const SubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signIn", {
        email,
        password,
        role,
      });
      setIsAuthorized(true);
      toast.success("Login successful!", {
        position: "top-center",
      });

      console.log("Login successful:", response.data);
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        // Error from server with a message
        toast.error(error.response.data.message || "Login failed!", {
          position: "top-center",
        });
      } else {
        // Network or unexpected error
        toast.error("Something went wrong. Please try again later.", {
          position: "top-center",
        });
      }
      console.log("Login error:", error);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen blur-background"
        style={{
          backgroundImage: "url('/Image/background_login.jpeg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-xs">
          <form
            onSubmit={SubmitForm}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="***********"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Select Role:
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  id="role"
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    Select Role
                  </option>
                  <option value="employer">Employer</option>
                  <option value="jobSeeker">Job Seeker</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 0 0-1.414-1.414L10 10.586 6.707 6.879a1 1 0 0 0-1.414 1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <p className="text-md pt-3">
              Don't Have An Account?&nbsp;
              <span>
                <Link to="/registrer" className="font-semibold underline">
                  Register Now!
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
