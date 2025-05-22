type CookieOptions = {
	expires?: number | Date;
	path?: string;
	domain?: string;
	secure?: boolean;
	sameSite?: 'Strict' | 'Lax' | 'None';
};

export const cookie = {
	set(name: string, value: string, options: CookieOptions = {}): void {
		let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

		if (options.expires) {
			const expires =
				options.expires instanceof Date
					? options.expires.toUTCString()
					: new Date(Date.now() + options.expires * 1000).toUTCString();
			cookieStr += `; Expires=${expires}`;
		}

		if (options.path) cookieStr += `; Path=${options.path}`;
		if (options.domain) cookieStr += `; Domain=${options.domain}`;
		if (options.secure) cookieStr += '; Secure';
		if (options.sameSite) cookieStr += `; SameSite=${options.sameSite}`;

		document.cookie = cookieStr;
	},

	get(name: string): string | undefined {
		const matches = document.cookie.match(
			new RegExp(
				`(?:^|; )${encodeURIComponent(name).replace(/[-.+*]/g, '\\$&')}=([^;]*)`
			)
		);
		return matches ? decodeURIComponent(matches[1]) : undefined;
	},

	remove(
		name: string,
		options: Partial<Pick<CookieOptions, 'path' | 'domain'>> = {}
	): void {
		this.set(name, '', {
			...options,
			expires: -1,
		});
	},
};
