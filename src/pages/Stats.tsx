import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Stats: React.FC = () => {
	return (
		<div className="p-4">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">統計</h1>
					<p className="text-gray-600">服用履歴の統計情報を確認できます。</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>服用統計</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">
							統計機能は今後実装予定です。
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};