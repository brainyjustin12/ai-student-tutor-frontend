import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: payload.id, email: payload.email });
      } catch { logout(); }
    }
  }, [token]);

  const login = (t, u) => { localStorage.setItem("token", t); setToken(t); setUser(u); };
  const logout = () => { localStorage.removeItem("token"); setToken(null); setUser(null); };

  return <AuthContext.Provider value={{ user, token, login, logout, isAuth: !!token }}>{children}</AuthContext.Provider>;
}
