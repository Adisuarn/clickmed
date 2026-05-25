import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { useSession } = authClient;
	const { data } = useSession();

	return (
		<>
			<p className="mt-4 text-lg">
				{data?.user.name
					? `Welcome, ${data.user.name}!`
					: "You are not logged in."}
			</p>
      {data && (
        <Link to="/auth/$path" params={{ path: "sign-out" }}>
          Sign Out
        </Link>
      )}
			{!data && (
				<Link to="/auth/$path" params={{ path: "sign-up" }}>
					Create Account
				</Link>
			)}
		</>
	);
}
