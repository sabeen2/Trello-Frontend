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
import { jwtDecode } from "jwt-decode";
import { Form } from "antd";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  username: string;
  email: string;
  success: boolean;
  setSuccess: (success: boolean) => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  createForm: any;
  selectedUserId?: string;
  setSelectedUserId: (selectedUserId: string | undefined) => void;
}

interface IDecodedToken {
  username: string;
  email: string;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [createForm] = Form.useForm();
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

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

  useEffect(() => {
    if (authToken) {
      const decoded: IDecodedToken = jwtDecode(authToken);
      setUsername(decoded?.username);
      setEmail(decoded?.email);
      const timeLeft = decoded.exp * 1000 - Date.now();

      if (timeLeft > 0) {
        setTimeout(() => {
          logout();
        }, timeLeft);
      }
    }
  });

  const login = (token: string) => {
    setIsAuthenticated(true);
    setAuthToken(token);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        username,
        email,
        success,
        setSuccess,
        open,
        setOpen,
        createForm,
        setSelectedUserId,
        selectedUserId,
      }}
    >
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
