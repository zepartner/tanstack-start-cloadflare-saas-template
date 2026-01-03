/** @format */

import z from 'zod';

export const userSchema = z.object({
	id: z.string(),
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	email: z.email(),
	description: z.string().optional(),
	favorite_color: z.string().optional(),
	created_at: z.string(),
	updated_at: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const usersSchema = z.array(userSchema);
export type Users = z.infer<typeof usersSchema>;

export const editableUserSchema = z.object({
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	email: z.email({ message: 'Please enter a valid email address.' }),
	description: z.string().optional(),
	favorite_color: z.string().optional(),
});

export type UserEditable = z.infer<typeof editableUserSchema>;
