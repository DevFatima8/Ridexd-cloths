"use client";

// Lightweight client-side admin auth. No database, no protected routes —
// credentials are stored in the browser's localStorage only.

const ACCOUNTS_KEY = "Ridexd-admin-accounts";
const SESSION_KEY = "Ridexd-admin-session";

type Account = { email: string; password: string; name: string };

function readAccounts(): Account[] {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeAccounts(list: Account[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list));
}

export function signup(name: string, email: string, password: string) {
  const accounts = readAccounts();
  const normalized = email.trim().toLowerCase();
  if (accounts.some((a) => a.email === normalized)) {
    return { ok: false, error: "An account with this email already exists." };
  }
  accounts.push({ name: name.trim(), email: normalized, password });
  writeAccounts(accounts);
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: normalized, name: name.trim() })
  );
  return { ok: true };
}

export function login(email: string, password: string) {
  const accounts = readAccounts();
  const normalized = email.trim().toLowerCase();
  const match = accounts.find(
    (a) => a.email === normalized && a.password === password
  );
  if (!match) {
    return { ok: false, error: "Invalid email or password." };
  }
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: match.email, name: match.name })
  );
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): { email: string; name: string } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
