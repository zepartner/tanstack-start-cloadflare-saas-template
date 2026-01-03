/** @format */

import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/users')({
	staticData: {
		title: 'Users',
		nav: false,
		order: 999,
		group: 'Users',
	},
	component: () => <Outlet />,
});
