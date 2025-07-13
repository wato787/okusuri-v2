import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
});

export type User = {
	id: string;
	email: string;
	name: string;
	image?: string | null;
};

export type Session = {
	user: User;
	session: {
		id: string;
		token: string;
		userId: string;
		expiresAt: Date;
		createdAt: Date;
		updatedAt: Date;
	};
};