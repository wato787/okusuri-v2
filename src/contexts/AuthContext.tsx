import React, { createContext, useContext, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient, type User, type Session } from "../lib/auth";

interface AuthContextType {
	user: User | null;
	session: Session | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string, name: string) => Promise<void>;
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

	const {
		data: session,
		isLoading,
	} = useQuery({
		queryKey: ["auth", "session"],
		queryFn: async () => {
			const { data, error } = await authClient.getSession();
			if (error) throw error;
			return data;
		},
		retry: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const signInMutation = useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string;
			password: string;
		}) => {
			const { data, error } = await authClient.signIn.email({
				email,
				password,
			});
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
		},
	});

	const signUpMutation = useMutation({
		mutationFn: async ({
			email,
			password,
			name,
		}: {
			email: string;
			password: string;
			name: string;
		}) => {
			const { data, error } = await authClient.signUp.email({
				email,
				password,
				name,
			});
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
		},
	});

	const signOutMutation = useMutation({
		mutationFn: async () => {
			const { data, error } = await authClient.signOut();
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
		},
	});

	const googleSignInMutation = useMutation({
		mutationFn: async () => {
			const { data, error } = await authClient.signIn.social({
				provider: "google",
			});
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth"] });
		},
	});

	const signIn = async (email: string, password: string) => {
		await signInMutation.mutateAsync({ email, password });
	};

	const signUp = async (email: string, password: string, name: string) => {
		await signUpMutation.mutateAsync({ email, password, name });
	};

	const signOut = async () => {
		await signOutMutation.mutateAsync();
	};

	const signInWithGoogle = async () => {
		await googleSignInMutation.mutateAsync();
	};

	const user = session?.user || null;
	const sessionData = session || null;
	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				session: sessionData,
				isLoading,
				isAuthenticated,
				signIn,
				signUp,
				signOut,
				signInWithGoogle,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};