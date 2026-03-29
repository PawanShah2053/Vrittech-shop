import { API_BASE_URL } from './endpoints';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type RequestConfig = RequestInit & {
  next?: NextFetchRequestConfig;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload
        ? String(payload.message)
        : 'Something went wrong while talking to the API.';

    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export async function apiFetch<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...config,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(config.headers || {})
    }
  });

  return parseResponse<T>(response);
}
