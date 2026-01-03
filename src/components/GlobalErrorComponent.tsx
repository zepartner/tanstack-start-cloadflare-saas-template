/** @format */

import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { AlertTriangle, ArrowLeft, HomeIcon, RefreshCw } from 'lucide-react';

interface GlobalErrorComponentProps {
	error?: Error | unknown;
}

function GlobalErrorComponent({ error }: GlobalErrorComponentProps = {}) {
	console.log('error', error);
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 relative overflow-hidden">
			{/* Decorative background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-400/10 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: '1s' }}
				/>
			</div>

			<div className="max-w-2xl w-full text-center space-y-8 relative z-10">
				{/* Animated Error with gradient */}
				<div className="relative">
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-96 h-96 bg-gradient-to-r from-red-400/20 via-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse" />
					</div>
					<div className="relative">
						<h1 className="text-9xl md:text-[12rem] font-black leading-none bg-gradient-to-r from-red-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
							!
						</h1>
					</div>
				</div>

				{/* Icon */}
				<div className="flex justify-center">
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-orange-400/30 rounded-full blur-xl" />
						<div className="relative bg-slate-100 dark:bg-slate-800 p-6 rounded-full border-2 border-slate-200 dark:border-slate-700">
							<AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400" />
						</div>
					</div>
				</div>

				{/* Message */}
				<div className="space-y-4">
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Something Went Wrong</h2>
					<p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
						{error instanceof Error
							? error.message || 'An unexpected error occurred. Please try again or contact support if the problem persists.'
							: 'An unexpected error occurred. Please try again or contact support if the problem persists.'}
					</p>
					{error instanceof Error && error.stack && (
						<details className="mt-6 text-left max-w-2xl mx-auto">
							<summary className="cursor-pointer text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
								Technical Details
							</summary>
							<pre className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 overflow-auto max-h-60">
								{error.stack}
							</pre>
						</details>
					)}
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
					<Button
						asChild
						size="lg"
						className="min-w-[160px]">
						<Link to="/dashboard">
							<HomeIcon className="w-4 h-4 mr-2" />
							Go to Dashboard
						</Link>
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="min-w-[160px]"
						onClick={() => window.history.back()}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Go Back
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="min-w-[160px]"
						onClick={() => window.location.reload()}>
						<RefreshCw className="w-4 h-4 mr-2" />
						Reload Page
					</Button>
				</div>
			</div>
		</div>
	);
}

export default GlobalErrorComponent;
