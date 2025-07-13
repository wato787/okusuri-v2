import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Profile: React.FC = () => {
	const { user } = useAuth();

	return (
		<div className="p-4">
			<div className="max-w-4xl mx-auto">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">プロフィール</h1>
					<p className="text-gray-600">アカウント情報を確認できます。</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>ユーザー情報</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<label className="text-sm font-medium text-gray-600">名前</label>
								<p className="text-lg text-gray-900">{user?.name}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-600">
									メールアドレス
								</label>
								<p className="text-lg text-gray-900">{user?.email}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};