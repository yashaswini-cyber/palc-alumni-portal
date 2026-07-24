const AUTH_KEY = "palcAuth";
const DEMO_USER = {
    username: "PALC01",
    password: "123"
};

export const AuthService = {
    validateCredentials(username: string, password: string) {
    return username === DEMO_USER.username &&
           password === DEMO_USER.password;
},
    login(username: string) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({
            isLoggedIn: true,
            username
        }));
    },

    logout() {
        localStorage.removeItem(AUTH_KEY);
    },

    isAuthenticated() {
        try {
            return JSON.parse(localStorage.getItem(AUTH_KEY) || "{}").isLoggedIn === true;
        } catch {
            return false;
        }
    },

    getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem(AUTH_KEY) || "{}");
        } catch {
            return null;
        }
    }
};