/** @format */

import { YoutubeIcon, type LucideIcon } from 'lucide-react';
import * as React from 'react';

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import CloudflareIcon from './icons/CloudflareIcon';
import GithubIcon from './icons/GithubIcon';
import TanStackStartIcon from './icons/TanStackStartIcon';

type NavSecondaryItem = {
	title: string;
	url: string;
	icon: LucideIcon;
};

const items: NavSecondaryItem[] = [
	{
		title: 'Gregory Moulton YT',
		url: 'https://www.youtube.com/@Gregory-Moulton',
		icon: YoutubeIcon,
	},
	{
		title: 'Project GitHub Repo',
		url: 'https://github.com/zepartner/tanstack-start-cloadflare-saas-template',
		icon: GithubIcon,
	},
	{
		title: 'Cloudflare Docs',
		url: 'https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/',
		icon: CloudflareIcon,
	},
	{
		title: 'Tanstack Start',
		url: 'https://tanstack.com/start/latest/docs/framework/react/overview',
		icon: TanStackStartIcon,
	},
];

export function NavSecondary({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map(item => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								size="sm">
								<a
									href={item.url}
									target="_blank"
									rel="noopener noreferrer">
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
