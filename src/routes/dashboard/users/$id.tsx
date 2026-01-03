/** @format */

import { ActionButton } from '@/components/ui/action-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { deleteUser } from '@/lib/mutations';
import { fetchUser } from '@/lib/queries';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { User } from '@/schemas/user-schemas';
import { createFileRoute, Link, notFound, useNavigate } from '@tanstack/react-router';
import { Calendar, FileText, Mail, Palette, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/dashboard/users/$id')({
	staticData: {
		title: 'User',
		nav: false,
		order: 2,
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
	const navigate = useNavigate();
	const user = Route.useLoaderData();

	const getColorValue = (colorName: string) => {
		const colorMap: Record<string, string> = {
			red: '#ef4444',
			blue: '#3b82f6',
			green: '#22c55e',
			yellow: '#eab308',
			purple: '#a855f7',
			pink: '#ec4899',
			orange: '#f97316',
			indigo: '#6366f1',
			teal: '#14b8a6',
			cyan: '#06b6d4',
			black: '#000000',
			white: '#ffffff',
			gray: '#6b7280',
			grey: '#6b7280',
		};
		return colorMap[colorName.toLowerCase()] || colorName;
	};

	return (
		<div className="flex flex-col gap-6 p-4 md:p-6 max-w-5xl mx-auto w-full">
			{/* Hero Section with Avatar */}
			<Card className="overflow-hidden">
				<div className="bg-gradient-to-br from-primary/5 via-background to-background p-8 md:p-10">
					<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
						<Avatar className="size-24 md:size-32 border-4 border-background shadow-lg">
							<AvatarImage
								src={
									user?.email === 'youtube@moultons.co.uk'
										? '/gregory-moulton-avatar.png'
										: `https://api.dicebear.com/9.x/lorelei/svg?flip=true&seed=${user?.email}`
								}
								alt={`${user?.first_name} ${user?.last_name}`}
							/>
							<AvatarFallback className="text-2xl md:text-3xl font-semibold">
								{user?.first_name?.charAt(0)}
								{user?.last_name?.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 text-center md:text-left">
							<CardTitle className="text-3xl md:text-4xl font-bold mb-2">
								{user?.first_name} {user?.last_name}
							</CardTitle>
							<CardDescription className="text-base md:text-lg flex items-center justify-center md:justify-start gap-2 mt-2">
								<Mail className="size-4" />
								{user?.email}
							</CardDescription>
							{user?.favorite_color && (
								<div className="flex items-center justify-center md:justify-start gap-2 mt-3">
									<Palette className="size-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">Favorite Color:</span>
									<div className="flex items-center gap-2">
										<div
											className="size-5 rounded-full border-2 border-background shadow-sm"
											style={{ backgroundColor: getColorValue(user.favorite_color) }}
										/>
										<span className="text-sm font-medium capitalize">{user.favorite_color}</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<Separator />
				<CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
					<Button
						className="w-full sm:w-auto sm:flex-1"
						variant="outline"
						asChild>
						<Link
							to="/dashboard/users/edit/$id"
							params={{ id: user?.id as string }}>
							Edit User
						</Link>
					</Button>
					<ActionButton
						className="w-full sm:w-auto sm:flex-1"
						variant="destructive"
						requireAreYouSure={true}
						areYouSureDescription="Are you sure you want to delete this user? This action cannot be undone."
						action={async () => {
							const toastId = toast.loading('Deleting user...');
							try {
								const response = await deleteUser({ data: user?.id as string });
								if (!response?.success) {
									throw new Error('Failed to delete user');
								}
								toast.success('User deleted successfully!', { id: toastId });
								navigate({ to: '/dashboard/users', replace: true });
								return { error: false, message: 'User deleted successfully' };
							} catch (error) {
								toast.error('Failed to delete user', { id: toastId });
								return { error: true, message: 'Failed to delete user' };
							}
						}}>
						Delete User
					</ActionButton>
				</CardFooter>
			</Card>

			{/* Personal Information Card */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-xl">
						<UserIcon className="size-5" />
						Personal Information
					</CardTitle>
					<CardDescription>Basic details about the user</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-2">
							<label className="text-sm font-medium text-muted-foreground">First Name</label>
							<p className="text-base font-medium">{user?.first_name || 'N/A'}</p>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-muted-foreground">Last Name</label>
							<p className="text-base font-medium">{user?.last_name || 'N/A'}</p>
						</div>
						<div className="space-y-2 md:col-span-2">
							<label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<Mail className="size-4" />
								Email Address
							</label>
							<p className="text-base font-medium break-all">{user?.email || 'N/A'}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Description Card */}
			{user?.description && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl">
							<FileText className="size-5" />
							Description
						</CardTitle>
						<CardDescription>Additional information about the user</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-base leading-relaxed whitespace-pre-wrap text-muted-foreground">{user.description}</p>
					</CardContent>
				</Card>
			)}

			{/* Timestamps Card */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-xl">
						<Calendar className="size-5" />
						Account Information
					</CardTitle>
					<CardDescription>Account creation and update timestamps</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-2">
							<label className="text-sm font-medium text-muted-foreground">Created At</label>
							<div>
								<p className="text-base font-medium">{formatDate(user?.created_at)}</p>
								<p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(user?.created_at)}</p>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-muted-foreground">Updated At</label>
							<div>
								<p className="text-base font-medium">{formatDate(user?.updated_at)}</p>
								<p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(user?.updated_at)}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
