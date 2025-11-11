import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export function UsernameProvider({ children }) {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("currentUser") || "";
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", user);
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
