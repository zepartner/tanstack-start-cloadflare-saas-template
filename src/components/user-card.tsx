/** @format */

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/utils';
import { User } from '@/schemas/user-schemas';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Calendar, Mail } from 'lucide-react';
import { Button } from './ui/button';

function UserCard({ user }: { user: User }) {
	return (
		<Card
			key={user.id}
			className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			<CardHeader className="relative">
				<div className="flex flex-row gap-4 items-start">
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<Avatar className="size-16 relative ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300">
							<AvatarImage
								src={
									user?.email === 'youtube@moultons.co.uk'
										? '/gregory-moulton-avatar.png'
										: `https://api.dicebear.com/9.x/lorelei/svg?flip=true&seed=${user?.email}`
								}
								alt={`${user.first_name} ${user.last_name}`}
							/>
							<AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-semibold">
								{user.first_name.charAt(0)}
								{user.last_name.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</div>
					<div className="flex-1 min-w-0">
						<CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors duration-300">
							{user.first_name} {user.last_name}
						</CardTitle>
						<CardDescription>
							<div className="flex flex-col gap-2 mt-2">
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<Mail className="w-3 h-3" />
									<span className="truncate">{user.email}</span>
								</div>
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<Calendar className="w-3 h-3" />
									<span>{formatRelativeTime(user.created_at)}</span>
								</div>
							</div>
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="relative pt-0">
				<CardAction>
					<Button
						variant="outline"
						className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-2"
						asChild
						key={user.id}>
						<Link
							to="/dashboard/users/$id"
							params={{ id: user.id as string }}>
							View Details
							<ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
						</Link>
					</Button>
				</CardAction>
			</CardContent>
		</Card>
	);
}

export default UserCard;
