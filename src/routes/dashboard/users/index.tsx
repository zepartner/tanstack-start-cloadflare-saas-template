/** @format */

import { createFileRoute } from '@tanstack/react-router';
import { Users2Icon } from 'lucide-react';

export const Route = createFileRoute('/dashboard/users/')({
	staticData: {
		title: 'All Users',
		icon: Users2Icon,
		nav: true,
		order: 2,
		group: 'Users',
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>ALL USERS</div>;
}
