import { getAuthToken } from '../lib/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface NotificationSetting {
  id: string;
  userId: string;
  isEnabled: boolean;
  subscription: string;
  platform: 'ios' | 'android' | 'web';
  createdAt: string;
  updatedAt: string;
}

export interface RegisterNotificationSetting {
  subscription: string;
  isEnabled: boolean;
  platform: 'ios' | 'android' | 'web';
}

export interface BaseResponse {
  success: boolean;
  message?: string;
}

// 通知設定を取得
export const getNotificationSetting = async (): Promise<
  NotificationSetting | undefined
> => {
  try {
    const token = getAuthToken();
    if (!token) return undefined;

    const response = await fetch(`${API_BASE_URL}/api/notification/setting`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return undefined;
    }

    return await response.json();
  } catch (error) {
    console.error('通知設定取得エラー:', error);
    return undefined;
  }
};

// 通知設定を登録
export const registerNotificationSetting = async (
  data: RegisterNotificationSetting
): Promise<BaseResponse> => {
  try {
    const token = getAuthToken();
    if (!token) {
      return { success: false, message: '認証が必要です' };
    }

    const response = await fetch(`${API_BASE_URL}/api/notification/setting`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return { success: false, message: '通知設定の登録に失敗しました' };
    }

    return { success: true };
  } catch (error) {
    console.error('通知設定登録エラー:', error);
    return { success: false, message: '通知設定の登録に失敗しました' };
  }
};
