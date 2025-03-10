import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.get(
        "https://minq05-portfolio.onrender.com/auth",
        {
          params: { username, password },
        }
      );

      if (res.data.length > 0) {
        setUser(res.data[0]);
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
