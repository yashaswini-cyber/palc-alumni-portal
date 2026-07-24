const AUTH_KEY = "palcAuth";

export const AuthService = {
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