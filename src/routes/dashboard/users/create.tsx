/** @format */

import { createFileRoute } from '@tanstack/react-router';
import { UserPlus2Icon } from 'lucide-react';

export const Route = createFileRoute('/dashboard/users/create')({
	staticData: {
		title: 'Create User',
		icon: UserPlus2Icon,
		nav: true,
		order: 3,
		group: 'Users',
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>CREATE USER</div>;
}
