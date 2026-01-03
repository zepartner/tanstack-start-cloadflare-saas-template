/** @format */

import { Button } from '@/components/ui/button';
import UserCard from '@/components/user-card';
import { User } from '@/schemas/user-schemas';

import { fetchUsers } from '@/lib/queries';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Search, Sparkles, TrendingUp, UserPlus, Users2Icon } from 'lucide-react';

export const Route = createFileRoute('/dashboard/users/')({
	staticData: {
		title: 'All Users',
		icon: Users2Icon,
		nav: true,
		order: 2,
		group: 'Users',
	},
	component: RouteComponent,
	loader: async () => {
		const data = await fetchUsers();
		console.log('[all-users] loader', data);
		return data;
	},
});

function RouteComponent() {
	const users = Route.useLoaderData();
	const userCount = users.length;

	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Animated gradient background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: '1s' }}
				/>
				<div
					className="absolute top-1/2 right-1/3 w-72 h-72 bg-chart-2/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: '2s' }}
				/>
			</div>

			<div className="relative z-10 flex flex-col gap-8 p-6 md:p-8 lg:p-12">
				{/* Header Section */}
				<div className="space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20">
								<Users2Icon className="w-6 h-6 text-primary" />
							</div>
							<div>
								<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
									Users
								</h1>
								<p className="text-muted-foreground mt-1">Manage and view all registered users</p>
							</div>
						</div>
						<Button
							className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
							asChild>
							<Link to="/dashboard/users/create">
								<UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
								Add New User
							</Link>
						</Button>
					</div>

					{/* Stats Bar */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-primary/10">
									<Users2Icon className="w-5 h-5 text-primary" />
								</div>
								<div>
									<p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{userCount}</p>
									<p className="text-xs text-muted-foreground">Total Users</p>
								</div>
							</div>
						</div>
						<div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-accent/10">
									<TrendingUp className="w-5 h-5 text-accent-foreground" />
								</div>
								<div>
									<p className="text-2xl font-bold bg-gradient-to-r from-accent-foreground to-chart-2 bg-clip-text text-transparent">
										{userCount > 0 ? 'Active' : 'Empty'}
									</p>
									<p className="text-xs text-muted-foreground">Status</p>
								</div>
							</div>
						</div>
						<div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-chart-2/10">
									<Sparkles className="w-5 h-5 text-chart-2" />
								</div>
								<div>
									<p className="text-2xl font-bold bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">{userCount}</p>
									<p className="text-xs text-muted-foreground">Registered</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Users List */}
				<div className="space-y-4">
					{userCount > 0 ? (
						<>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Search className="w-4 h-4" />
								<span>
									Showing {userCount} {userCount === 1 ? 'user' : 'users'}
								</span>
							</div>
							<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
								{users.map((user: User) => (
									<div
										key={user.id}
										className="transform transition-all duration-300 hover:scale-[1.02]">
										<UserCard user={user} />
									</div>
								))}
							</div>
						</>
					) : (
						<div className="flex flex-col items-center justify-center py-16 px-4">
							<div className="p-6 rounded-full bg-muted/50 mb-4">
								<Users2Icon className="w-12 h-12 text-muted-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-2">No users yet</h3>
							<p className="text-sm text-muted-foreground text-center max-w-md mb-6">Get started by adding your first user to the system</p>
							<Button
								className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 shadow-lg"
								asChild>
								<Link to="/dashboard/users/create">
									<UserPlus className="w-4 h-4 mr-2" />
									Create First User
								</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
