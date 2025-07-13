import React, { createContext, useContext, useEffect, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  signInWithGoogle as authSignInWithGoogle, 
  signOut as authSignOut, 
  getSession, 
  setAuthToken,
  type User,
  type Session
} from "../lib/auth";

interface AuthContextType {
	user: User | null;
	session: Session | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	signOut: () => Promise<void>;
	signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const queryClient = useQueryClient();

	// URL からトークンを取得して保存（OAuth コールバック用）
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');
		if (token) {
			setAuthToken(token);
			// URLからトークンを削除
			window.history.replaceState({}, document.title, window.location.pathname);
			// セッションを再取得
			queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
		}
	}, [queryClient]);

	const {
		data: authData,
		isLoading,
	} = useQuery({
		queryKey: ["auth", "session"],
		queryFn: getSession,
		retry: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const signOutMutation = useMutation({
		mutationFn: authSignOut,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
		},
	});

	const googleSignInMutation = useMutation({
		mutationFn: authSignInWithGoogle,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
		},
	});


	const signOut = async () => {
		await signOutMutation.mutateAsync();
	};

	const signInWithGoogle = async () => {
		await googleSignInMutation.mutateAsync();
	};

	const user = authData?.user || null;
	const session = authData?.session || null;
	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				isLoading,
				isAuthenticated,
				signOut,
				signInWithGoogle,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};