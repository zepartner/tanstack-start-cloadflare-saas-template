/** @format */

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/users/edit/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>EDIT USER</div>;
}
