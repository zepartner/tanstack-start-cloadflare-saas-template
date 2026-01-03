/** @format */

import { ActionButton } from '@/components/ui/action-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createUser } from '@/lib/mutations';
import { editableUserSchema, User } from '@/schemas/user-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerFn } from '@tanstack/react-start';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

function AddUserForm({ onSuccess, onCancel }: { onSuccess: ({ success, user }: { success: boolean; user: User }) => void; onCancel?: () => void }) {
	const createUserFn = useServerFn(createUser);
	const form = useForm<z.infer<typeof editableUserSchema>>({
		resolver: zodResolver(editableUserSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			description: '',
			favorite_color: '',
		},
	});
	const onSubmit = async (data: z.infer<typeof editableUserSchema>) => {
		const toastId = toast.loading('Creating user...');
		try {
			const response = await createUserFn({ data });
			console.log('createUser() -> response', response);
			if (!response?.success) {
				throw new Error('Failed to create user');
			}
			toast.success('New User Created Successfully!', { id: toastId });
			form.reset();
			onSuccess({ success: true, user: response.user });
			return { error: false, message: 'User created successfully' };
		} catch (error) {
			console.error('add-user-form.tsx -> onSubmit()', { error });
			toast.error('Failed to create user', { id: toastId, description: error instanceof Error ? error.message : 'Unknown error' });
			return { error: true, message: 'Failed to create user' };
		}
	};
	//
	return (
		<Form {...form}>
			<form className="space-y-8 w-full">
				<FormField
					control={form.control}
					name="first_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input
									placeholder="John"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="last_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Doe"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="john.doe@example.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="I am a software engineer"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="favorite_color"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Favorite Color</FormLabel>
							<FormControl>
								<Input
									placeholder="Blue"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-row w-full justify-between gap-4">
					<div className="w-full">
						<ActionButton
							variant="destructive"
							className="w-full"
							requireAreYouSure={true}
							areYouSureDescription="Are you sure you want to cancel the user creation?"
							action={async () =>
								await new Promise<{ error: boolean; message?: string }>(resolve => {
									if (onCancel) {
										onCancel();
									}
									resolve({ error: false, message: 'User creation cancelled' });
								})
							}>
							Cancel
						</ActionButton>
					</div>

					<div className="w-full">
						<ActionButton
							disabled={form.formState.isSubmitting}
							className="w-full"
							action={async () => {
								await form.handleSubmit(onSubmit)();

								return { error: false, message: 'User created successfully' };
							}}
							requireAreYouSure={true}
							areYouSureDescription="Are you sure you want to create this user?">
							Save
						</ActionButton>
					</div>
				</div>
			</form>
		</Form>
	);
}

export default AddUserForm;
