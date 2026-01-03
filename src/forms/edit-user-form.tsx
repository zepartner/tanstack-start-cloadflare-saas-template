/** @format */

import { ActionButton } from '@/components/ui/action-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { editUser } from '@/lib/mutations';
import { editableUserSchema, User } from '@/schemas/user-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useServerFn } from '@tanstack/react-start';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

function EditUserForm({
	user,
	onSuccess,
	onCancel,
}: {
	user: User;
	onSuccess: ({ success, user }: { success: boolean; user: User }) => void;
	onCancel?: () => void;
}) {
	const editUserFn = useServerFn(editUser);
	const form = useForm<z.infer<typeof editableUserSchema>>({
		resolver: zodResolver(editableUserSchema),
		defaultValues: {
			first_name: user.first_name || '',
			last_name: user.last_name || '',
			email: user.email || '',
			description: user.description || '',
			favorite_color: user.favorite_color || '',
		},
	});
	const onSubmit = async (data: z.infer<typeof editableUserSchema>) => {
		const toastId = toast.loading('Creating user...');
		try {
			const response = await editUserFn({ data: { ...data, id: user.id } });
			console.log('editUser() -> response', response);
			if (!response?.success) {
				throw new Error('Failed to edit user');
			}
			toast.success('User Edited Successfully!', { id: toastId });
			form.reset();
			onSuccess({ success: true, user: response.user });
			return { error: false, message: 'User edited successfully' };
		} catch (error) {
			toast.error('Failed to edit user', { id: toastId, description: error instanceof Error ? error.message : 'Unknown error' });
			return { error: true, message: 'Failed to edit user' };
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

								return { error: false, message: 'User edited successfully' };
							}}
							requireAreYouSure={true}
							areYouSureDescription="Are you sure you want to save these changes?">
							Save
						</ActionButton>
					</div>
				</div>
			</form>
		</Form>
	);
}

export default EditUserForm;
