/** @format */

import { createFileRoute } from '@tanstack/react-router';
import { HomeIcon } from 'lucide-react';

export const Route = createFileRoute('/dashboard/')({
	staticData: {
		title: 'Dashboard',
		icon: HomeIcon,
		nav: true,
		order: 1,
		group: 'Dashboard',
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>DASHBOARD HOME</div>;
}
