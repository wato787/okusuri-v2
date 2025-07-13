import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Stats: React.FC = () => {
	return (
		<div className="container max-w-md mx-auto pt-8 pb-24 px-4">
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
	);
};