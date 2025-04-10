interface IApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkResponse<T>(res: Response): Promise<T> {
	if (!res.ok) {
		throw new Error(`HTTP ${res.status}: ${res.statusText}`);
	}
	return res.json().then((data: IApiResponse<T>) => {
		if (!data.success) {
			throw new Error('API request was not successful');
		}
		if ('data' in data) {
			return data.data as T;
		} else {
			return data as T;
		}
	});
}

export function request<T>(url: string, options?: RequestInit): Promise<T> {
	return fetch(url, options).then(checkResponse<T>);
}
