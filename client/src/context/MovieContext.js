import { createContext, useContext } from "react";

export const MovieContext = createContext();

export const useMovie = () => {
  return useContext(MovieContext);
};
