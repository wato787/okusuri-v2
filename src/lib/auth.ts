// React/Vite環境では直接HTTPクライアントを使用
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  token: string;
  expiresAt: string;
}

export interface AuthResponse {
  user: User;
  session: Session;
}

// Google OAuth認証開始
export const signInWithGoogle = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/google`);
  const data = await response.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    throw new Error('OAuth URLの取得に失敗しました');
  }
};

// セッション情報取得
export const getSession = async (
  token?: string
): Promise<AuthResponse | null> => {
  try {
    const storedToken = token || localStorage.getItem('authToken');
    if (!storedToken) return null;

    // トークンが文字列であることを確認
    if (typeof storedToken !== 'string') {
      console.error('無効なトークン形式:', storedToken);
      localStorage.removeItem('authToken');
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/session`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        return null;
      }
      throw new Error('セッション取得に失敗しました');
    }

    return await response.json();
  } catch (error) {
    console.error('セッション取得エラー:', error);
    return null;
  }
};

// サインアウト
export const signOut = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      await fetch(`${API_BASE_URL}/api/auth/signout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.error('サインアウトエラー:', error);
  } finally {
    localStorage.removeItem('authToken');
  }
};

// トークンを保存
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// トークンを取得
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};
