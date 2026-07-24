const AUTH_KEY = "palcAuth";

const DEMO_ALUMNI = {
  username: "PALC01",
  password: "123",
};
const DEMO_ADMIN = {
  username: "PALCHR01",
  password: "123",
};

type UserRole = "alumni" | "admin";
type AuthSession = {
  isLoggedIn: boolean;
  username: string;
  role: UserRole;
};

export const AuthService = {
    /*Alumni Authentication*/
 validateCredentials(username: string, password: string) {
  return (
    username === DEMO_ALUMNI.username &&
    password === DEMO_ALUMNI.password
  );
},

  login(username: string) {
    const session: AuthSession = {
      isLoggedIn: true,
      username,
      role: "alumni",
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  },

  // Admin Authentication
  validateAdminCredentials(username: string, password: string) {
    return (
      username === DEMO_ADMIN.username &&
      password === DEMO_ADMIN.password
    );
  },
  authenticate(username: string, password: string) {
  if (
    username === DEMO_ALUMNI.username &&
    password === DEMO_ALUMNI.password
  ) {
    return {
      success: true,
      role: "alumni" as const,
    };
  }
  
  if (
    username === DEMO_ADMIN.username &&
    password === DEMO_ADMIN.password
  ) {
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

  loginAdmin(username: string) {
    const session: AuthSession = {
      isLoggedIn: true,
      username,
      role: "admin",
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  },

  // Common
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