import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("dermcare_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password, role) => {
    try {
      // Attempt backend login
      const { data } = await API.post("/auth/login", { email, password, role });
      const authenticatedUser = data.user || { name: email.split("@")[0], email, role };
      
      setUser(authenticatedUser);
      localStorage.setItem("dermcare_user", JSON.stringify(authenticatedUser));
      if (data.token) localStorage.setItem("dermcare_token", data.token);
      return authenticatedUser;
    } catch (err) {
      // Offline / Simulated Fallback for demo testing
      const mockUser = {
        name: email.split("@")[0] || "Staff Member",
        email: email,
        role: (role || "patient").toLowerCase(),
      };
      setUser(mockUser);
      localStorage.setItem("dermcare_user", JSON.stringify(mockUser));
      return mockUser;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dermcare_user");
    localStorage.removeItem("dermcare_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};