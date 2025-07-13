import React from "react";

export const Calendar: React.FC = () => {
	return (
		<div className="min-h-screen p-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">カレンダー</h1>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<p className="text-gray-600">
						薬の服用スケジュールを管理するカレンダー機能がここに実装されます。
					</p>
				</div>
			</div>
		</div>
	);
};