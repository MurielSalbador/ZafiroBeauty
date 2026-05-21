import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";
import { env } from "@Depilacion/env/web";

export const authClient = createAuthClient({
	baseURL: env.VITE_SERVER_URL,
	fetchOptions: {
		credentials: "include",
	},
	plugins: [polarClient()]
});
