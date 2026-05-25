import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { useRouter, useNavigate, Link } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth/auth-provider";
import { authClient } from "@/lib/auth-client";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export interface AppRouterContext {
	queryClient: QueryClient;
}

export function getRouterContext(): AppRouterContext {
	const queryClient = new QueryClient();

	queryClient.setQueryDefaults(["auth", "getSession"], {
		staleTime: 5 * 60 * 1000,
		gcTime: 30 * 60 * 1000,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	return {
		queryClient,
	};
}

export function AppProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const { queryClient } = router.options.context;

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<ThemeBoundAuthProvider>{children}</ThemeBoundAuthProvider>
				<Toaster richColors />
			</ThemeProvider>
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					{
						name: "Tanstack Query",
						render: <ReactQueryDevtoolsPanel />,
					},
				]}
			/>
		</QueryClientProvider>
	);
}

function ThemeBoundAuthProvider({ children }: { children: ReactNode }) {
	const navigate = useNavigate();

	return (
		<AuthProvider
			authClient={authClient}
			// localization={{
			// 	auth: {
			// 		signIn: "เข้าสู่ระบบ",
			// 	}
			// }}
			emailAndPassword={{
				enabled: true,
				confirmPassword: true,
				minPasswordLength: 8,
				maxPasswordLength: 32,
				forgotPassword: false,
			}}
			redirectTo="/"
			navigate={navigate}
			Link={Link}
		>
			{children}
		</AuthProvider>
	);
}
