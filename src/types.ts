/** @format */

import { ReactNode } from 'react';

export type NavItem = {
	to: string;
	label: string;
	icon?: ReactNode;
	order?: number;
	group?: string;
};
