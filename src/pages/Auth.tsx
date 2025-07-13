import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">
							{isSignUp ? "アカウント作成" : "サインイン"}
						</CardTitle>
						<p className="text-sm text-gray-600">Okusuri - 薬管理アプリ</p>
					</CardHeader>
					<CardContent>
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div className="space-y-4">
								{isSignUp && (
									<div className="space-y-2">
										<Label htmlFor="name">名前</Label>
										<Input
											id="name"
											name="name"
											type="text"
											required={isSignUp}
											value={name}
											onChange={(e) => setName(e.target.value)}
											placeholder="お名前"
										/>
									</div>
								)}
								<div className="space-y-2">
									<Label htmlFor="email">メールアドレス</Label>
									<Input
										id="email"
										name="email"
										type="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="メールアドレス"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">パスワード</Label>
									<Input
										id="password"
										name="password"
										type="password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="パスワード"
									/>
								</div>
							</div>

							<div className="space-y-4">
								<Button type="submit" disabled={loading} className="w-full">
									{loading ? (
										<LoadingSpinner size="sm" />
									) : isSignUp ? (
										"アカウント作成"
									) : (
										"サインイン"
									)}
								</Button>

								<Button
									type="button"
									variant="outline"
									onClick={handleGoogleSignIn}
									disabled={loading}
									className="w-full"
								>
									{loading ? <LoadingSpinner size="sm" /> : "Googleでサインイン"}
								</Button>

								<Button
									type="button"
									variant="link"
									onClick={() => setIsSignUp(!isSignUp)}
									className="w-full"
								>
									{isSignUp
										? "既にアカウントをお持ちですか？ サインイン"
										: "アカウントをお持ちでない方は アカウント作成"}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};