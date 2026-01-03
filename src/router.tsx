/** @format */

import { createRouter } from '@tanstack/react-router';

// Import the generated route tree
import GlobalErrorComponent from './components/GlobalErrorComponent';
import GlobalNotFound from './components/GlobalNotFoundComponent';
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: () => <GlobalErrorComponent />,
		defaultNotFoundComponent: () => <GlobalNotFound />,
	});

	return router;
};
