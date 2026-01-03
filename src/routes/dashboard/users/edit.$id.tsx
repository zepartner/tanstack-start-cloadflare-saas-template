/** @format */

import EditUserForm from '@/forms/edit-user-form';
import { fetchUser } from '@/lib/queries';
import { User } from '@/schemas/user-schemas';
import { createFileRoute, notFound, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/users/edit/$id')({
	staticData: {
		title: 'Edit User',
		nav: false,
		order: 3,
		group: 'Users',
		crumb: ({ loaderData }: { loaderData: User | undefined }) => {
			if (!loaderData || !loaderData.first_name || !loaderData.last_name) {
				return 'Invalid User';
			}
			return `${loaderData.first_name} ${loaderData.last_name}`;
		},
	},
	component: RouteComponent,
	loader: async ({ params }) => {
		const user = await fetchUser({ data: params.id as string });
		if (!user) {
			throw notFound();
		}
		return user;
	},
});

function RouteComponent() {
	const user = Route.useLoaderData();
	const router = useRouter();
	const onSuccess = ({ success, user }: { success: boolean; user: User }) => {
		if (success) {
			router.navigate({ to: '/dashboard/users/$id', params: { id: user.id } });
		}
	};
	const onCancel = () => {
		router.navigate({ to: '/dashboard/users/$id', params: { id: user.id } });
	};
	return (
		<div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto w-full">
			<EditUserForm
				user={user}
				onSuccess={onSuccess}
				onCancel={onCancel}
			/>
		</div>
	);
}
