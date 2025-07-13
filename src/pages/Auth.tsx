import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export const Auth: React.FC = () => {
	const { isAuthenticated, isLoading, signIn, signUp, signInWithGoogle } =
		useAuth();
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			// Redirect will be handled by Navigate component below
		}
	}, [isAuthenticated]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (isSignUp) {
				await signUp(email, password, name);
			} else {
				await signIn(email, password);
			}
		} catch (error) {
			console.error("Auth error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
			await signInWithGoogle();
		} catch (error) {
			console.error("Google sign in error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						{isSignUp ? "アカウント作成" : "サインイン"}
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Okusuri - 薬管理アプリ
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						{isSignUp && (
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700">
									名前
								</label>
								<input
									id="name"
									name="name"
									type="text"
									required={isSignUp}
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
									placeholder="お名前"
								/>
							</div>
						)}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								メールアドレス
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="メールアドレス"
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								パスワード
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="パスワード"
							/>
						</div>
					</div>

					<div className="space-y-4">
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
						>
							{loading ? (
								<LoadingSpinner size="sm" />
							) : isSignUp ? (
								"アカウント作成"
							) : (
								"サインイン"
							)}
						</button>

						<button
							type="button"
							onClick={handleGoogleSignIn}
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
						>
							{loading ? <LoadingSpinner size="sm" /> : "Googleでサインイン"}
						</button>

						<button
							type="button"
							onClick={() => setIsSignUp(!isSignUp)}
							className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
						>
							{isSignUp
								? "既にアカウントをお持ちですか？ サインイン"
								: "アカウントをお持ちでない方は アカウント作成"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};