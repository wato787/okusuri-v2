import {
	type MedicationLog,
	type MedicationLogRequest,
	type MedicationStatus,
	medicationLogSchema,
	medicationStatusSchema,
	medicationLogListSchema,
} from "@/types/medication";
import type { ApiResponse } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

class ApiClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;
		const config: RequestInit = {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		const response = await fetch(url, config);

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} ${response.statusText}`);
		}

		return response.json();
	}

	async get<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: "GET" });
	}

	async post<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async put<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: "DELETE" });
	}
}

const apiClient = new ApiClient(API_BASE_URL);

// 薬関連のAPI関数
export const medicationApi = {
	// 服薬ログの取得
	async getMedicationLogs(): Promise<MedicationLog[]> {
		const response = await apiClient.get<ApiResponse<MedicationLog[]>>(
			"/api/medication-log",
		);
		return medicationLogListSchema.parse(response.data);
	},

	// 服薬ログの作成
	async createMedicationLog(
		data: MedicationLogRequest,
	): Promise<MedicationLog> {
		const response = await apiClient.post<ApiResponse<MedicationLog>>(
			"/api/medication-log",
			data,
		);
		return medicationLogSchema.parse(response.data);
	},

	// 服薬ログの更新
	async updateMedicationLog(
		id: string,
		data: Partial<MedicationLogRequest>,
	): Promise<MedicationLog> {
		const response = await apiClient.put<ApiResponse<MedicationLog>>(
			`/api/medication-log/${id}`,
			data,
		);
		return medicationLogSchema.parse(response.data);
	},

	// 服薬ログの削除
	async deleteMedicationLog(id: string): Promise<void> {
		await apiClient.delete(`/api/medication-log/${id}`);
	},

	// 薬の状態取得
	async getMedicationStatus(): Promise<MedicationStatus> {
		const response = await apiClient.get<ApiResponse<MedicationStatus>>(
			"/api/medication/status",
		);
		return medicationStatusSchema.parse(response.data);
	},

	// 特定期間の服薬ログ取得
	async getMedicationLogsByDateRange(
		startDate: string,
		endDate: string,
	): Promise<MedicationLog[]> {
		const response = await apiClient.get<ApiResponse<MedicationLog[]>>(
			`/api/medication-log?start=${startDate}&end=${endDate}`,
		);
		return medicationLogListSchema.parse(response.data);
	},
};