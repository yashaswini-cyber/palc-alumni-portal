import { adminAccounts } from "../../data/mockEmployeeData";
import { getAlumniAccounts } from "../mockData/localStorage";

const AUTH_KEY = "palcAuth";

type UserRole = "alumni" | "admin";

type AuthSession = {
  isLoggedIn: boolean;
  username: string;
  role: UserRole;
};

export const AuthService = {
  // Alumni Authentication
  validateCredentials(username: string, password: string) {
    return getAlumniAccounts().some(
      (user) =>
        (user.username === username ||
          user.email.toLowerCase() === username.toLowerCase()) &&
        user.password === password
    );
  },

  // Admin Authentication
  validateAdminCredentials(username: string, password: string) {
    return adminAccounts.some(
      (user) =>
        user.username === username &&
        user.password === password
    );
  },

  // Used by Login Page
  authenticate(username: string, password: string) {
    const alumni = getAlumniAccounts().find(
      (user) =>
        (user.username === username ||
          user.email.toLowerCase() === username.toLowerCase()) &&
        user.password === password
    );

    if (alumni) {
      return {
        success: true,
        role: "alumni" as const,
      };
    }

    const admin = adminAccounts.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (admin) {
      return {
        success: true,
        role: "admin" as const,
      };
    }

    return {
      success: false,
      role: null,
    };
  },

  login(username: string) {
    const session: AuthSession = {
      isLoggedIn: true,
      username,
      role: "alumni",
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  },

  loginAdmin(username: string) {
    const session: AuthSession = {
      isLoggedIn: true,
      username,
      role: "admin",
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY) || "{}");
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    const user = this.getCurrentUser();

    return (
      user?.isLoggedIn === true &&
      user?.role === "alumni"
    );
  },

  isAdminAuthenticated() {
    const user = this.getCurrentUser();

    return (
      user?.isLoggedIn === true &&
      user?.role === "admin"
    );
  },
};