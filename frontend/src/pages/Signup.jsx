import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { authStore } from "../store/authStore.js";
import {Link} from 'react-router-dom'



const Signup = () => {
  const { signup, isLoading, error, isAuthenticated } = authStore();
  const [inputForm, setinputForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputForm.name || !inputForm.email || !inputForm.password) return;
    try {
      await signup(inputForm);
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
      
      <div className=" p-2 shadow-md flex flex-col items-center justify-center gap-4 ">
        <h1 className="text-center">Signup</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center justify-center gap-3"
        >
          <Input
            type={"text"}
            placeholder={"fullname"}
            value={inputForm.name}
            onChange={(e) =>
              setinputForm({ ...inputForm, name: e.target.value })
            }
          />
          <Input
            type={"email"}
            placeholder={"email"}
            value={inputForm.email}
            onChange={(e) =>
              setinputForm({ ...inputForm, email: e.target.value })
            }
          />
          <Input
            type={"password"}
            placeholder={"password"}
            value={inputForm.password}
            onChange={(e) =>
              setinputForm({ ...inputForm, password: e.target.value })
            }
          />
             <Button type={"submit"} label={"Signup"} loading ={isLoading} />
        </form>
        <h3 className="text-sm mt-2 text-[#9d9999]">
          Don't have an account?{" "}
          <Link to={"/login"} className="underline text-blue-500 cursor-pointer">Login</Link>
        </h3>
      </div>
    </motion.div>
  );
};

export default Signup;
