import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../utils/enum";

type AuthContextType = {
  isUserAuthenticated: () => boolean;
  login: (userData: AuthUser) => void;
  getUser: () => AuthUser | null;
  testData: (data: TestResponseData) => void;
  getTestData: () => TestResponseData | null;
  logout: () => void;
};

export type AuthUser = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    role: {
      id: number;
      role: string;
    };
    userInfo: PositionType[];
  };
  questionCount: string;
};

export interface PositionType {
  position: {
    id: number;
    position: string;
  };
}

type Option = {
  id: number;
  option: string;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
};

export type TestResponseData = {
  subjectId: number;
  questionsWithOptions: Question[];
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [testResponse, setTestResponse] = useState<TestResponseData | null>(
    null,
  );

  const navigate = useNavigate();

  const login = (userData: AuthUser) => {
    localStorage.setItem("id", userData?.user?.id ?? 0);
    localStorage.setItem("firstName", userData?.user?.firstName ?? "");
    localStorage.setItem("lastName", userData?.user?.lastName ?? "");
    localStorage.setItem("email", userData?.user?.email ?? "");
    localStorage.setItem("token", userData?.user?.token ?? "");
    localStorage.setItem("role", userData?.user?.role?.role ?? "");
    localStorage.setItem("roleId", userData?.user?.role?.id.toString() ?? "");
    localStorage.setItem(
      "isSuperAdmin",
      userData?.user?.role?.id.toString() === Role.SuperAdmin
        ? "true"
        : "false",
    );
    localStorage.setItem(
      "isAdmin",
      userData?.user?.role?.id.toString() === Role.Admin ? "true" : "false",
    );
    if (userData.user.role.id.toString() == Role.User) {
      localStorage.setItem(
        "position",
        userData?.user?.userInfo[0]?.position?.position ?? null,
      );
      localStorage.setItem("questionCount", userData?.questionCount);
    } else {
      undefined;
    }

    setUser(userData);
  };

  const getUser = () => user;

  const isUserAuthenticated = () => !!localStorage.getItem("token");

  const logout = () => {
    localStorage.clear(), setUser(null), navigate("/");
  };
  const testData = (data: TestResponseData) => {
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
