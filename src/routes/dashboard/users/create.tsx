/** @format */

import AddUserForm from '@/forms/add-user-form';
import { User } from '@/schemas/user-schemas';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { UserPlus2 } from 'lucide-react';

export const Route = createFileRoute('/dashboard/users/create')({
	staticData: {
		title: 'Create User',
		icon: UserPlus2,
		group: 'Users',
		order: 2,
	},
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const onSuccess = ({ success, user }: { success: boolean; user: User }) => {
		if (success) {
			router.navigate({ to: '/dashboard/users/$id', params: { id: user.id } });
		}
	};
	const onCancel = () => {
		router.navigate({ to: '/dashboard/users' });
	};
	return (
		<div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto w-full">
			<AddUserForm
				onSuccess={onSuccess}
				onCancel={onCancel}
			/>
		</div>
	);
}
