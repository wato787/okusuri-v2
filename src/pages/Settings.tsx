import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Settings: React.FC = () => {
	return (
		<div className="p-4">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">設定</h1>
					<p className="text-gray-600">アプリケーションの設定を変更できます。</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>設定項目</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">
							設定機能は今後実装予定です。
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};