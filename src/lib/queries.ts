/** @format */

import { User, Users } from '@/schemas/user-schemas';
import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { env } from 'cloudflare:workers';

export const fetchUsers = createServerFn({
	method: 'GET',
}).handler(async (): Promise<Users> => {
	const result = await env.DB.prepare('SELECT * FROM users').all();
	if (!result?.results) {
		throw notFound();
	}
	return result.results as Users;
});

export const fetchUser = createServerFn({
	method: 'POST',
})
	.inputValidator((d: string) => d)
	.handler(async ({ data }): Promise<User | undefined> => {
		if (!data) {
			throw notFound();
		}
		console.log('id', data);
		const result = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(data).first();
		if (!result?.id) {
			throw notFound();
		}
		//
		return result as User;
	});

export const fetchUserCount = createServerFn({
	method: 'GET',
}).handler(async (): Promise<number> => {
	const result = await env.DB.prepare('SELECT COUNT(*) AS count FROM users').first();
	if (!result?.count) {
		throw notFound();
	}
	return result.count as number;
});

export const fetchUserLastCreatedAt = createServerFn({
	method: 'GET',
}).handler(async (): Promise<string> => {
	const result = await env.DB.prepare('SELECT created_at FROM users ORDER BY created_at DESC LIMIT 1').first();
	if (!result?.created_at) {
		throw notFound();
	}
	return result.created_at as string;
});

/**
 * NOT IMPLEMENTED YET - THE FUNCTION WORKS BUT YOU NEED TO IMPLEMENT THE UI TO USE IT
 * Search for users by first name, last name, or email
 * @param data - The data containing the query and page number
 * @returns The users matching the search criteria
 */
export const searchUsers = createServerFn({
	method: 'POST',
})
	.inputValidator((d: { query: string; page: number }) => d)
	.handler(async ({ data }): Promise<User[]> => {
		const { query, page } = data;
		console.log('searchUsers() -> START', { data });
		const result = await env.DB.prepare('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?')
			.bind(`%${query}%`, `%${query}%`, `%${query}%`)
			.all();
		console.log('searchUsers()', { result });
		const results = (result?.results as User[]) || [];
		return results;
	});
