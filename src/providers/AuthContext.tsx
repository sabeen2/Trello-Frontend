"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage(
    "authToken",
    ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
      if (["/", "/login", "/signup"].includes(location.pathname)) {
        router.push("/dashboard");
      }
    } else {
      if (!["/login", "/signup"].includes(location.pathname)) {
        router.push("/login");
      }
    }
  }, [router]);

  const login = (token: string) => {
    setIsAuthenticated(true);
    setAuthToken(token);
    router.push("/dashboard");
  };

  const logout = () => {
    removeAuthToken;
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
