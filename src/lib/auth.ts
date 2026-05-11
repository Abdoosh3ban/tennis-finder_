export const AUTH_STORAGE_KEY = "tennisfinder_auth";
export const ADMIN_EMAIL = "admin@tennisfinder.com";
export const ADMIN_PASSWORD = "1234567809";

export type StoredUser = {
  email: string;
  fullName?: string;
  role: "admin" | "player";
  adminVerified?: boolean;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isAdminEmail(email: string) {
  return normalizeEmail(email) === ADMIN_EMAIL;
}

export function isValidAdminPassword(password: string) {
  return password === ADMIN_PASSWORD;
}

export function getStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      ...user,
      email: normalizeEmail(user.email),
    }),
  );
}

export function clearStoredUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
