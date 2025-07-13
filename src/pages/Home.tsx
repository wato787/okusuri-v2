import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
						<Button variant="destructive" size="sm" onClick={signOut}>
							Sign Out
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>今日の薬</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								今日服用予定の薬がここに表示されます。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>カレンダー</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								薬の服用スケジュールを確認できます。
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>統計</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								服用状況の統計情報を表示します。
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};