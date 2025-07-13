import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const Home: React.FC = () => {
	const { user, signOut } = useAuth();

	return (
		<div className="min-h-screen p-4">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Okusuri - 薬管理アプリ
					</h1>
					<div className="flex items-center gap-4">
						<span className="text-sm text-gray-600">
							Welcome, {user?.name}!
						</span>
						<button
							onClick={signOut}
							className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
						>
							Sign Out
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4">今日の薬</h2>
						<p className="text-gray-600">
							今日服用予定の薬がここに表示されます。
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4">カレンダー</h2>
						<p className="text-gray-600">
							薬の服用スケジュールを確認できます。
						</p>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4">統計</h2>
						<p className="text-gray-600">
							服用状況の統計情報を表示します。
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};