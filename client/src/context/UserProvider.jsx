import { UserContext } from "./UserContext";
import { useState, useEffect } from "react";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  // Function to update the user information
  const loginUser = (id = null, email = "", username = "", avatarurl = "") => {
    const newUser = { id, email, username, avatarurl };
    setUser(newUser);
  };

  const logoutUser = () => {
    setUser({ id: null, email: null, username: null, avatarurl: null });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
