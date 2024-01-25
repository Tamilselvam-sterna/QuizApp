import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../utils/enum";

type AuthContextType = {
  isUserAuthenticated: () => boolean;
  login: (userData: AuthUser) => void;
  getUser: () => AuthUser | null;
  logout: () => void;
};

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: {
    id: number;
    role: string;
  };
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [testResponse, setTestResponse] = useState(null);

  const navigate = useNavigate();

  const login = (userData: AuthUser) => {
    localStorage.setItem("id", userData?.id ?? 0);
    localStorage.setItem("firstName", userData?.firstName ?? "");
    localStorage.setItem("lastName", userData?.lastName ?? "");
    localStorage.setItem("email", userData?.email ?? "");
    localStorage.setItem("token", userData?.token ?? "");
    localStorage.setItem("role", userData?.role?.role ?? "");
    localStorage.setItem("roleId", userData?.role?.id.toString() ?? "");
    localStorage.setItem(
      "isSuperAdmin",
      userData.id.toString() === Role.SuperAdmin ? "true" : "false",
    );
    localStorage.setItem(
      "isAdmin",
      userData.id.toString() === Role.Admin ? "true" : "false",
    );
    setUser(userData);
  };

  const getUser = () => user;

  const isUserAuthenticated = () => !!localStorage.getItem("token");

  const logout = () => {
    localStorage.clear(), setUser(null), navigate("/");
  };
  const testData = (data: any) => {
    setTestResponse(data);
  };
  const getTestData = () => testResponse;

  return (
    <AuthContext.Provider
      value={{
        isUserAuthenticated,
        getUser,
        login,
        logout,
        testData,
        getTestData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
