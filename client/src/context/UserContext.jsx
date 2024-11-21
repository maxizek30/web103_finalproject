import { useState, useEffect, useContext, createContext } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { id: null, email: null, username: null, avatarurl: null };
  });

  // Function to update the user information
  const loginUser = (id = null, email = "", username = "", avatarurl = "") => {
    const newUser = { id, email, username, avatarurl };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logoutUser = () => {
    setUser({ id: null, email: null, username: null, avatarurl: null });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
