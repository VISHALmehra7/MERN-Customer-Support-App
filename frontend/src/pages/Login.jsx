import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import {motion} from 'framer-motion'
import { authStore } from "../store/authStore.js";
import {Link} from 'react-router-dom'

const Login = () => {
  const { login, isLoading, error, isAuthenticated } = authStore();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;
    try {
      await login(loginForm);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-white "
    >
      <div className=" p-2 shadow-md flex flex-col items-center justify-center gap-4">
        <h1 className="text-center">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-3"
        >
          <Input
            type={"email"}
            placeholder={"email"}
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
          />
          <Input
            type={"password"}
            placeholder={"password"}
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
          />
          <Button type={"submit"} label={"Login"} loading={isLoading}/>
        </form>
        <h3 className="text-sm mt-2 text-[#9d9999]">
          Already have an account?{" "}
          <Link to={"/signup"} className="underline text-blue-500 cursor-pointer">Signup</Link>
        </h3>
      </div>
    </motion.div>
  );
};

export default Login;
