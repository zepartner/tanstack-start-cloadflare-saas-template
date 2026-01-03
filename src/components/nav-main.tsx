/** @format */

'use client';

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { buildNav, groupBy } from '@/lib/router-utils';
import { routeTree } from '@/routeTree.gen';
import { NavItem } from '@/types';
import { useMatchRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';

export function NavMain() {
	const navigate = useNavigate();
	const items = useMemo(() => buildNav(routeTree), []);
	const matchRoute = useMatchRoute();
	const groups = groupBy(items, (i: NavItem) => i.group);
	//
	return (
		<>
			{Object.entries(groups).map(([group, list]) => (
				<SidebarGroup key={group}>
					{group !== 'main' ? <SidebarGroupLabel>{group}</SidebarGroupLabel> : null}
					<SidebarGroupContent>
						<SidebarMenu>
							{list.map(item => {
								const isActive = !!matchRoute({ to: item.to, fuzzy: false });
								//

								//
								return (
									<SidebarMenuItem key={item.to}>
										<SidebarMenuButton
											asChild
											data-active={isActive ? 'true' : 'false'}>
											<a
												href={'#'}
												target="_blank"
												rel="noopener noreferrer"
												onClick={e => {
													e.preventDefault();
													navigate({ to: item.to });
												}}>
												{item.icon ? <item.icon /> : null}
												<span>{item.label}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			))}
		</>
	);
}
