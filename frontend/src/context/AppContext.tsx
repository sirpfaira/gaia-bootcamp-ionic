import React, { createContext, useState, ReactNode } from "react";

interface User {
  name: string;
  age: number;
}

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
}

const initialUser = { name: "Guest", age: 0 };

// Create the context with a default value
export const AppContext = createContext<AppContextType>({
  user: initialUser, // default values for name and age
  setUser: () => {},
});

// Create the Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
