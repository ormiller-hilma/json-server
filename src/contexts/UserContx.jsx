import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export function UsernameProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("currentUser") || {});

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
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
