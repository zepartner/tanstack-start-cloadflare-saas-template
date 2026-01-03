/** @format */

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/users/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>SPECIFIC USER</div>;
}
