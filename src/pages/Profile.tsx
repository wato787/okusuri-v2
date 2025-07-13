import React from "react";

export const Profile: React.FC = () => {
	return (
		<div className="min-h-screen p-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">プロフィール</h1>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<p className="text-gray-600">
						ユーザープロフィール設定がここに実装されます。
					</p>
				</div>
			</div>
		</div>
	);
};