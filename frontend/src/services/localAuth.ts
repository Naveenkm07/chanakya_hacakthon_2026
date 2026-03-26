// Browser-only Auth — no backend needed
// Users are stored in localStorage, tokens are base64-encoded sessions

const USERS_KEY = 'chanakya_users';
const TOKEN_KEY = 'userToken';
const NAME_KEY = 'userName';

interface StoredUser {
    name: string;
    email: string;
    passwordHash: string;
}

// Simple hash using Web Crypto API (SHA-256)
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'chanakya-salt-2026');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers(): Record<string, StoredUser> {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveUsers(users: Record<string, StoredUser>) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function createToken(email: string, name: string): string {
    const payload = { email, name, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
    return btoa(JSON.stringify(payload));
}

function validateToken(): { email: string; name: string } | null {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;
        const payload = JSON.parse(atob(token));
        if (payload.exp < Date.now()) {
            localStorage.removeItem(TOKEN_KEY);
            return null;
        }
        return { email: payload.email, name: payload.name };
    } catch {
        return null;
    }
}

export async function register(name: string, email: string, password: string): Promise<string> {
    const users = getUsers();
    if (users[email]) {
        throw new Error('User already exists with this email.');
    }
    const passwordHash = await hashPassword(password);
    users[email] = { name, email, passwordHash };
    saveUsers(users);

    const token = createToken(email, name);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(NAME_KEY, name);
    return token;
}

export async function login(email: string, password: string): Promise<string> {
    const users = getUsers();
    const user = users[email];
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const passwordHash = await hashPassword(password);
    if (passwordHash !== user.passwordHash) {
        throw new Error('Invalid email or password');
    }
    const token = createToken(email, user.name);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(NAME_KEY, user.name);
    return token;
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
}

export function isLoggedIn(): boolean {
    return validateToken() !== null;
}

export { TOKEN_KEY };
