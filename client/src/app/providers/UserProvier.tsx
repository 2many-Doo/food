"use client";
import axios from "axios";
import { createContext, PropsWithChildren, useState, useContext } from "react";

type User = {
  email: string;
  password: string;
};

type UserContextType = {
  user: User;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
