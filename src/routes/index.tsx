/** @format */

import { Button } from '@/components/ui/button';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App });

function App() {
	return (
		<div className="min-h-screen">
			<div className="w-full flex justify-center gap-8 flex-col p-10">
				<h1 className="text-2xl font-bold text-center">Our App Home Page</h1>
				<Button asChild>
					<Link to="/dashboard">Go to Dashboard</Link>
				</Button>
			</div>
		</div>
	);
}
