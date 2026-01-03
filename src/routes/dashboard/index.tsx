/** @format */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchUserCount, fetchUserLastCreatedAt } from '@/lib/queries';
import { formatRelativeTime } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Clock, Cloud, Database, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export const Route = createFileRoute('/dashboard/')({
	staticData: { title: 'Dashboard', nav: false, order: 1, group: 'Dashboard' },
	component: RouteComponent,
	loader: async () => {
		const userCount = await fetchUserCount();
		const lastUserCreatedAt = await fetchUserLastCreatedAt();
		return { userCount, lastUserCreatedAt };
	},
});

function RouteComponent() {
	const { userCount, lastUserCreatedAt } = Route.useLoaderData();
	return (
		<div className="min-h-screen relative overflow-hidden">
			{/* Animated gradient background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: '1s' }}
				/>
				<div
					className="absolute top-1/2 left-1/2 w-72 h-72 bg-chart-2/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: '2s' }}
				/>
			</div>

			<div className="relative z-10 flex flex-col gap-8 p-6 md:p-8 lg:p-12">
				{/* Header Section */}
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20">
							<Sparkles className="w-6 h-6 text-primary" />
						</div>
						<div>
							<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
								Dashboard
							</h1>
							<p className="text-muted-foreground mt-1">Welcome to your analytics overview</p>
						</div>
					</div>

					{/* Info Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
						<div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Cloud className="w-4 h-4" />
								<span>Cloudflare Workers</span>
							</div>
							<p className="text-xs text-muted-foreground mt-2">Free tier deployment</p>
						</div>
						<div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Database className="w-4 h-4" />
								<span>Cloudflare D1</span>
							</div>
							<p className="text-xs text-muted-foreground mt-2">Serverless database</p>
						</div>
						<div className="p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Zap className="w-4 h-4" />
								<span>TanStack Start</span>
							</div>
							<p className="text-xs text-muted-foreground mt-2">Open source framework</p>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
					{/* User Count Card */}
					<Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
						<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<CardHeader className="relative">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform duration-300">
										<Users className="w-6 h-6 text-primary" />
									</div>
									<div>
										<CardTitle className="text-xl">Total Users</CardTitle>
										<CardDescription>Registered in the system</CardDescription>
									</div>
								</div>
								<TrendingUp className="w-5 h-5 text-primary/50" />
							</div>
						</CardHeader>
						<CardContent className="relative">
							<div className="flex items-baseline gap-2">
								<span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{userCount}</span>
								<span className="text-sm text-muted-foreground">users</span>
							</div>
							<div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
								<div
									className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
									style={{ width: `${Math.min((userCount / 100) * 100, 100)}%` }}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Last User Created Card */}
					<Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
						<div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<CardHeader className="relative">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 group-hover:scale-110 transition-transform duration-300">
										<Clock className="w-6 h-6 text-accent-foreground" />
									</div>
									<div>
										<CardTitle className="text-xl">Last User Created</CardTitle>
										<CardDescription>Most recent registration</CardDescription>
									</div>
								</div>
								<Sparkles className="w-5 h-5 text-accent/50" />
							</div>
						</CardHeader>
						<CardContent className="relative">
							{lastUserCreatedAt ? (
								<div className="space-y-3">
									<div className="flex items-baseline gap-2">
										<span className="text-3xl font-bold bg-gradient-to-r from-accent-foreground to-chart-2 bg-clip-text text-transparent">
											{formatRelativeTime(lastUserCreatedAt)}
										</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
										<span>Active</span>
									</div>
								</div>
							) : (
								<div className="text-muted-foreground">No users yet</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Description Section */}
				<div className="max-w-4xl mx-auto w-full">
					<Card className="border-2 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Database className="w-5 h-5 text-primary" />
								About This Demo
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
								<p className="flex items-start gap-2">
									<span className="text-primary mt-1">•</span>
									<span>
										This is a demo of the <strong className="text-foreground">TanStack Start</strong> framework deployed to a completely free{' '}
										<strong className="text-foreground">Cloudflare Workers</strong> account using{' '}
										<strong className="text-foreground">Cloudflare D1</strong> as the database.
									</span>
								</p>
								<p className="flex items-start gap-2">
									<span className="text-primary mt-1">•</span>
									<span>
										All data is stored in a free Cloudflare D1 database and all server functions are executed on the free Cloudflare Workers account.
									</span>
								</p>
								<p className="flex items-start gap-2">
									<span className="text-primary mt-1">•</span>
									<span>The code for this demo is available on GitHub and is open source.</span>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
