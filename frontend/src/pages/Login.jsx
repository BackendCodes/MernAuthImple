import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { backendUrl, setIsLogged } = useContext(AppContent);

  const onsubmit = async (data) => {
    setLoading(true);
    const { name, email, password } = data;
    try {
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const data = await axios.post(backendUrl + "api/auth/register", {
          name,
          email,
          password,
        });

        if (data.data.success) {
          setIsLogged(true);
          navigate("/");
        } else {
          toast.error(data.data.message);
        }
      } else {
        const data = await axios.post(backendUrl + "api/auth/login", {
          email,
          password,
        });

        if (data.data.success) {
          setIsLogged(true);
          navigate("/");
        } else {
          toast.error(data.data.message);
        }
      }
      reset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-br from-blue-200 to-purple-400 min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-8">
      {/* Logo */}

      <img
        onClick={() => navigate("/")}
        src="/logo.svg"
        alt="logo"
        className="absolute cursor-pointer top-6 left-6 w-12 sm:w-16 md:w-20"
      />

      {/* Main Card */}
      <div className="bg-[#0e182c] w-full max-w-md sm:max-w-lg rounded-xl shadow-lg px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl text-white font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h1>
          <p className="text-indigo-500 text-sm sm:text-base mt-1">
            {state === "Sign Up"
              ? "Create your account"
              : "Login into your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onsubmit)} className="w-full">
          <div className="flex flex-col gap-4 w-full">
            {state === "Sign Up" && (
              <div className="bg-[#313b5d] flex items-center gap-3 rounded-full px-4 sm:px-5 py-2">
                <span className="w-5 sm:w-6">
                  <img
                    src="/person_icon.svg"
                    alt="person icon"
                    className="w-full"
                  />
                </span>
                <input
                  {...register("name")}
                  required
                  type="text"
                  placeholder="Full Name"
                  className="flex-1 px-2 py-1 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
            )}

            <div className="bg-[#313b5d] flex items-center gap-3 rounded-full px-4 sm:px-5 py-2">
              <span className="w-5 sm:w-6">
                <img src="/mail_icon.svg" alt="mail icon" className="w-full" />
              </span>
              <input
                {...register("email")}
                required
                type="email"
                placeholder="Email ID"
                className="flex-1 px-2 py-1 text-white bg-transparent outline-none text-sm sm:text-base"
              />
            </div>

            <div className="bg-[#313b5d] flex items-center gap-3 rounded-full px-4 sm:px-5 py-2">
              <span className="w-5 sm:w-6">
                <img src="/lock_icon.svg" alt="lock icon" className="w-full" />
              </span>
              <input
                {...register("password")}
                required
                type="password"
                placeholder="Password"
                className="flex-1 px-2 py-1 text-white bg-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Forgot Password */}
          {state === "Login" && (
            <div className="flex justify-end mt-3 w-full">
              <p
                onClick={() => navigate("/reset-password")}
                className="text-indigo-500 text-sm sm:text-base cursor-pointer hover:underline"
              >
                Forgot Password?
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button className="bg-indigo-500 mt-6 cursor-pointer px-5 py-2 sm:py-3 rounded-full w-full text-white text-sm sm:text-base font-medium hover:bg-indigo-600 transition-colors duration-200">
            {loading ? "loading..." : state}
          </button>

          {/* Switch State */}
          <div className="mt-6 text-center">
            {state === "Sign Up" ? (
              <p className="text-white text-sm sm:text-base">
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-indigo-500 underline cursor-pointer hover:text-indigo-400"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-white text-sm sm:text-base">
                Don’t have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-indigo-500 underline cursor-pointer hover:text-indigo-400"
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
