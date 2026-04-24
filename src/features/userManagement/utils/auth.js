export const AUTH_KEY = "sprouty_auth";

export function login(email, password) {
  const ok = email === "admin@sprouty.com" && password === "Sprouty@123";

  if (ok) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, role: "ADMIN" }));
    return { ok: true };
  }
  return { ok: false, message: "Invalid email or password" };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getAuth();
}