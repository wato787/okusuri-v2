import React from "react";
import { MedicationCalendar } from "@/components/calendar/MedicationCalendar";

export const Calendar: React.FC = () => {
	return (
		<div className="p-4">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">カレンダー</h1>
					<p className="text-gray-600">
						薬の服用履歴を確認し、新しい記録を追加できます。
					</p>
				</div>
				<MedicationCalendar />
			</div>
		</div>
	);
};