import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { medicationApi } from "@/services/medicationApi";
import type {
	MedicationLog,
	MedicationLogRequest,
} from "@/types/medication";
import { toast } from "react-hot-toast";

// クエリキー定数
export const MEDICATION_QUERY_KEYS = {
	all: ["medication"] as const,
	logs: () => [...MEDICATION_QUERY_KEYS.all, "logs"] as const,
	status: () => [...MEDICATION_QUERY_KEYS.all, "status"] as const,
	logsByDateRange: (startDate: string, endDate: string) =>
		[...MEDICATION_QUERY_KEYS.logs(), "dateRange", startDate, endDate] as const,
};

// 服薬ログ取得フック
export function useMedicationLogs() {
	return useQuery({
		queryKey: MEDICATION_QUERY_KEYS.logs(),
		queryFn: medicationApi.getMedicationLogs,
		staleTime: 5 * 60 * 1000, // 5分間はキャッシュを新鮮とみなす
	});
}

// 薬の状態取得フック
export function useMedicationStatus() {
	return useQuery({
		queryKey: MEDICATION_QUERY_KEYS.status(),
		queryFn: medicationApi.getMedicationStatus,
		staleTime: 2 * 60 * 1000, // 2分間はキャッシュを新鮮とみなす
	});
}

// 期間指定での服薬ログ取得フック
export function useMedicationLogsByDateRange(
	startDate: string,
	endDate: string,
) {
	return useQuery({
		queryKey: MEDICATION_QUERY_KEYS.logsByDateRange(startDate, endDate),
		queryFn: () => medicationApi.getMedicationLogsByDateRange(startDate, endDate),
		enabled: !!startDate && !!endDate,
		staleTime: 10 * 60 * 1000, // 10分間はキャッシュを新鮮とみなす
	});
}

// 服薬ログ作成フック
export function useCreateMedicationLog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: medicationApi.createMedicationLog,
		onSuccess: (newLog: MedicationLog) => {
			// ログリストのキャッシュを無効化
			queryClient.invalidateQueries({
				queryKey: MEDICATION_QUERY_KEYS.logs(),
			});
			// 状態のキャッシュも無効化（服用状況が変わる可能性があるため）
			queryClient.invalidateQueries({
				queryKey: MEDICATION_QUERY_KEYS.status(),
			});

			// 楽観的更新: 新しいログをキャッシュに追加
			queryClient.setQueryData<MedicationLog[]>(
				MEDICATION_QUERY_KEYS.logs(),
				(oldLogs) => {
					if (!oldLogs) return [newLog];
					return [newLog, ...oldLogs];
				},
			);

			toast.success("服薬記録を追加しました");
		},
		onError: (error: Error) => {
			toast.error(`服薬記録の追加に失敗しました: ${error.message}`);
		},
	});
}

// 服薬ログ更新フック
export function useUpdateMedicationLog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: Partial<MedicationLogRequest>;
		}) => medicationApi.updateMedicationLog(id, data),
		onSuccess: (updatedLog: MedicationLog) => {
			// ログリストのキャッシュを更新
			queryClient.setQueryData<MedicationLog[]>(
				MEDICATION_QUERY_KEYS.logs(),
				(oldLogs) => {
					if (!oldLogs) return [updatedLog];
					return oldLogs.map((log) =>
						log.id === updatedLog.id ? updatedLog : log,
					);
				},
			);

			// 関連するクエリを無効化
			queryClient.invalidateQueries({
				queryKey: MEDICATION_QUERY_KEYS.status(),
			});

			toast.success("服薬記録を更新しました");
		},
		onError: (error: Error) => {
			toast.error(`服薬記録の更新に失敗しました: ${error.message}`);
		},
	});
}

// 服薬ログ削除フック
export function useDeleteMedicationLog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: medicationApi.deleteMedicationLog,
		onSuccess: (_, deletedId: string) => {
			// ログリストから削除
			queryClient.setQueryData<MedicationLog[]>(
				MEDICATION_QUERY_KEYS.logs(),
				(oldLogs) => {
					if (!oldLogs) return [];
					return oldLogs.filter((log) => log.id !== deletedId);
				},
			);

			// 関連するクエリを無効化
			queryClient.invalidateQueries({
				queryKey: MEDICATION_QUERY_KEYS.status(),
			});

			toast.success("服薬記録を削除しました");
		},
		onError: (error: Error) => {
			toast.error(`服薬記録の削除に失敗しました: ${error.message}`);
		},
	});
}