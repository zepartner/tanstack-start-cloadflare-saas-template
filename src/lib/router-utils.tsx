/** @format */

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { NavItem } from '@/types';
import { Link, useMatches } from '@tanstack/react-router';
import { ReactNode } from 'react';

/** @format */
/**
 * Build a flat list of navigable items from a TanStack route tree.
 *
 * Params:
 *  - node: the imported `routeTree` root
 *  - basePath: string used during recursion (leave empty)
 * Returns:
 *  - Array<{ to: string, label: string, icon?: ReactNode, order?: number, group?: string }>
 *
 * Rules:
 *  - Only include routes whose options.staticData?.nav !== false
 *  - Use options.staticData?.title as label (fallback to route.path)
 *  - Keep nested paths ("/settings/profile")
 *
 * Example:
 *   import { routeTree } from '../routeTree.gen'
 *   const items = buildNav(routeTree)
 */
export function buildNav(node: any, basePath = ''): NavItem[] {
	const out: { to: string; label: string; icon?: ReactNode; order?: number; group?: string }[] = [];
	const children = node.children || [];

	for (const child of children) {
		const path = normalize(basePath, child.path);
		const sd = child.options?.staticData || {};
		const label = sd.title || child.id || path || '/';
		const nav = sd.nav;
		const item = {
			to: path || '/',
			label,
			icon: sd.icon,
			order: typeof sd.order === 'number' ? sd.order : 9999,
			group: sd.group || null,
		};

		if (nav !== false && child.path !== '$') {
			// hide param-only capture routes by default
			out.push(item);
		}
		if (child.children?.length) {
			out.push(...buildNav(child, path));
		}
	}

	// de-dup and sort by order then label
	const seen = new Set();
	return out
		.filter(i => {
			const key = i.to;
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		})
		.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.label.localeCompare(b.label));
}

function normalize(base: string, frag: string): string {
	const a = base === '/' ? '' : base;
	const f = frag || '';
	const raw = `${a}/${f}`.replace(/\/+/g, '/');
	return raw === '' ? '/' : raw;
}

/** @format */
/**
 * Breadcrumbs
 * Builds crumbs from the current matches. Uses each route's staticData.title
 * or a custom `staticData.crumb` which can be:
 *  - string
 *  - function: ({ params, search, loaderData, staticData }) => string
 *
 * Example:
 *   <Breadcrumbs />
 */

export function Breadcrumbs() {
	const matches = useMatches() as any;

	const crumbs = matches
		// hide root if it has nav:false
		.filter((m: any) => m.pathname !== '' && m.pathname !== undefined)
		.map((m: any) => {
			// console.log('m', m);
			const sd = m.staticData || {};
			const label =
				typeof sd.crumb === 'function'
					? sd.crumb({
							params: m.params,
							search: m.search,
							loaderData: m.loaderData,
							staticData: sd,
						})
					: sd.crumb || sd.title || m.routeId;
			return { to: m.pathname, label };
		})
		.filter((c: any) => !!c.label);

	if (!crumbs.length) return null;

	return (
		<Breadcrumb className="hidden sm:block">
			<BreadcrumbList>
				<BreadcrumbItem>
					<Link to="/dashboard">
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</Link>
				</BreadcrumbItem>
				{crumbs.map((c: any, i: number) => {
					// console.log('c', c);
					if (!c.to || c.to === '/' || c.to === '/dashboard' || c.to === '/dashboard/') return null;
					if (i == crumbs.length - 1) {
						return (
							<span
								key={c.to}
								className="flex gap-1 items-center justify-center align-middle">
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>{c.label}</BreadcrumbPage>
								</BreadcrumbItem>
							</span>
						);
					} else {
						return (
							<span
								key={c.to}
								className="flex gap-1 items-center justify-center align-middle">
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<Link to={c.to}>
										<BreadcrumbPage>{c.label}</BreadcrumbPage>
									</Link>
								</BreadcrumbItem>
							</span>
						);
					}
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export function groupBy(arr, keyFn) {
	return arr.reduce((acc, x) => {
		const k = keyFn(x);
		if (!k) return acc;
		(acc[k] ||= []).push(x);
		return acc;
	}, {});
}
