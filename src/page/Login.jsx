import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);

    if (success) {
      alert("Đăng nhập thành công !");
      navigate("/");
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen p-6 text-center">
      <motion.div
        className="mt-6 md:mt-0 md:ml-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <form class="form" onSubmit={handleSubmit}>
            <p class="title">Login</p>
            <input
              placeholder="Username"
              class="username input"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Password"
              class="password input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button class="btn" type="submit">
              Login
            </button>
            <a href="/" className="view">
              Chỉ xem
            </a>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
