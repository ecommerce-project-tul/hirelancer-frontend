import jwt_decode from 'jwt-decode';
const STORAGE_SESSION_KEY = 'tokem';

export interface SessionObject {
  userId: string;
  userEmail: string;
  iat: string;
  exp: string;
}

export default class Session {
  public static saveSession(token: string): void {
    localStorage.setItem(STORAGE_SESSION_KEY, token);
  }

  public static clearSession(): void {
    localStorage.clear();
  }

  public static getSessionToken(): string | null {
    const token = localStorage.getItem(STORAGE_SESSION_KEY);
    if (token === 'undefined' || !token) {
      return null;
    }
    return token;
  }

  public static getSessionObject(): SessionObject | null {
    const token = this.getSessionToken();
    if (!token) return null;
    return jwt_decode<SessionObject>(token);
  }
}
