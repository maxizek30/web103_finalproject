import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsFillPersonFill, BsFillKeyFill } from "react-icons/bs";
import background from "../assets/background2.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Typing from "react-typing-effect";
import { useUser } from "../context/UserContext";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function Login() {
  const AUTH_URL = `${import.meta.env.VITE_API_URL}/auth/github`;
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSaving(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    };
    try {
      const response = await fetch("/users/checklogin", options);
      if (response.ok) {
        console.log("Login Successfully!");
        const data = await response.json();
        loginUser(data.id, data.email, data.username);
        navigate("/movie-page");
        reset();
      } else {
        toast.error("Wrong Username or Password");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main
      className={`h-lvh w-full bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-30`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="grid place-items-center h-full">
        <div></div>
        <Typing
          text={["Movie Trackr: Find Your Movie!"]}
          className="text-5xl font-bold text-cyberYellow"
          speed={100}
          eraseDelay={2000}
          typingDelay={100}
        />
        <div className="border border-metallicSilver shadow-2xl rounded-xl h-[28rem] lg:w-[30rem] w-[22rem] bg-darkCharcoal/55 backdrop-blur-md mb-10">
          <form
            className="w-full h-full flex flex-col items-start justify-center py-5 lg:px-10 px-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-bold text-cyberYellow self-center">
              Log In
            </h1>

            <label className="text-electricBlue mb-2 mt-8">Username</label>
            <div className="relative w-full">
              <input
                {...register("username")}
                className="w-full rounded-lg h-9 px-2 pl-8 pb-1 bg-metallicSilver/20 text-metallicSilver shadow-lg outline-none focus:border-neonPink focus:border-2"
              />
              <BsFillPersonFill className="text-lg text-electricBlue absolute top-2 left-2" />
            </div>
            <p className="text-sm text-neonPink font-semibold mt-1">
              {errors.username?.message}
            </p>

            <label className="text-electricBlue mb-2 mt-10">Password</label>
            <div className="relative w-full">
              {/* Password Input */}
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full rounded-lg h-9 px-2 pl-8 pb-1 bg-metallicSilver/20 text-metallicSilver shadow-lg outline-none focus:border-neonPink focus:border-2"
              />
              <BsFillKeyFill className="text-lg text-electricBlue absolute top-2 left-2" />

              {/* Show Password Checkbox */}
              <div className="mt-2 ml-1 flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  className="mr-2 w-4 h-4 text-electricBlue border-gray-300 rounded focus:ring-neonPink"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label
                  htmlFor="showPassword"
                  className="text-sm text-metallicSilver"
                >
                  Show Password
                </label>
              </div>
            </div>
            <p className="text-sm text-neonPink font-semibold mt-1">
              {errors.password?.message}
            </p>

            <button
              type="submit"
              disabled={isSaving}
              className="self-center bg-electricBlue text-darkCharcoal rounded-lg px-4 py-2 mt-8 shadow-md hover:bg-cyberYellow/80 hover:scale-105 duration-300"
            >
              {isSaving ? "Logging you in..." : "Login"}
            </button>
            <div className="self-center mt-8 break-word">
              <a
                href="/signup"
                className="self-center text-slate-300 rounded-lg px-6 py-2.5  mr-4 hover:bg-red-600 hover:scale-105 duration-300"
              >
                {" "}
                Signup{" "}
              </a>{" "}
              <a
                href={AUTH_URL}
                className="self-center text-slate-300 rounded-lg px-6 py-2.5  mr-4 hover:bg-red-600 hover:scale-105 duration-300 cursor-pointer"
              >
                🔒 Login via GitHub
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
