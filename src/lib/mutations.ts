/** @format */

import { User, UserEditable } from '@/schemas/user-schemas';
import { createServerFn } from '@tanstack/react-start';
import { env } from 'cloudflare:workers';

const checkIsLocked = () => {
	if (env.LOCKED) {
		// toast.error('This application is locked. You cannot make changes to this example system.');
		throw new Error('This application is locked. You cannot make changes to this example system.');
	}
};

export const createUser = createServerFn({
	method: 'POST',
})
	.inputValidator((d: UserEditable) => d)
	.handler(async ({ data }): Promise<{ success: boolean; user: User }> => {
		checkIsLocked();
		try {
			console.log('createUser() -> START', { data });
			const result = await env.DB.prepare(
				'INSERT INTO users (first_name, last_name, email, description, favorite_color) VALUES (?, ?, ?, ?, ?) RETURNING *'
			)
				.bind(data.first_name, data.last_name, data.email, data.description, data.favorite_color)
				.first();
			console.log('createUser()', { result });
			if (!result?.id) {
				console.error('createUser()', { result });
				throw new Error('Failed to create user');
			}
			return { success: true, user: result as User };
		} catch (error) {
			console.error('createUser() -> ERROR', { error });
			if (error instanceof Error && error.message.startsWith('D1_ERROR: UNIQUE constraint failed: users.email')) {
				throw new Error(`Email (${data.email}) already exists. Email must be unique.`);
			}
			throw error;
		}
	});

type UserEditableWithId = UserEditable & { id: string };
export const editUser = createServerFn({
	method: 'POST',
})
	.inputValidator((d: UserEditableWithId) => d)
	.handler(async ({ data }): Promise<{ success: boolean; user: User }> => {
		checkIsLocked();
		try {
			const result = await env.DB.prepare(
				'UPDATE users SET first_name = ?, last_name = ?, email = ?, description = ?, favorite_color = ? WHERE id = ? RETURNING *'
			)
				.bind(data.first_name, data.last_name, data.email, data.description, data.favorite_color, data.id)
				.first();
			console.log('editUser()', result);
			if (!result?.id) {
				throw new Error('Failed to edit user');
			}
			return { success: true, user: result as User };
		} catch (error) {
			console.error('editUser() -> ERROR', { error });
			if (error instanceof Error && error.message.startsWith('D1_ERROR: UNIQUE constraint failed: users.email')) {
				throw new Error(`Email (${data.email}) already exists. Email must be unique.`);
			}
			throw error;
		}
	});

export const deleteUser = createServerFn({
	method: 'POST',
})
	.inputValidator((d: string) => d)
	.handler(async ({ data }): Promise<{ success: boolean }> => {
		checkIsLocked();
		const result = await env.DB.prepare('DELETE FROM users WHERE id = ?').bind(data).run();
		console.log('deleteUser()', result);
		if (!result?.success) {
			throw new Error('Failed to delete user');
		}
		return { success: true };
	});
