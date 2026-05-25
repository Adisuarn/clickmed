import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";

import { AppProvider } from "@/components/providers";
import type { AppRouterContext } from "@/components/providers";

import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<AppRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="h-full w-full overflow-x-hidden font-noto-sans-thai">
				<AppProvider>
					{children}
				</AppProvider>
				<Scripts />
			</body>
		</html>
	);
}
