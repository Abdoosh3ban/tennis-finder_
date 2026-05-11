const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || '';
const BACKEND_BEARER_TOKEN = import.meta.env.VITE_BACKEND_BEARER_TOKEN as string | undefined;
const TEST_USER_ID = import.meta.env.VITE_TEST_USER_ID as string | undefined;

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error?: {
    message?: string;
    code?: string | number;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type BackendCourt = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  surfaceType: string;
  pricePerHour: number;
  amenities?: string[] | null;
  rating?: number | null;
};

export type BackendItemOwner = {
  id: string;
  firstName: string;
  lastName: string;
};

export type BackendItem = {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  condition: string;
  askingPrice: number;
  suggestedPrice?: number | null;
  images?: string[] | null;
  owner?: BackendItemOwner;
};

export type BackendBooking = {
  id: string;
  startTime: string;
  endTime: string;
  createdAt?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  cancellationReason?: string | null;
  court?: {
    id: string;
    name: string;
  };
  player?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type BackendCourtPayload = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  surfaceType: string;
  pricePerHour: number;
  amenities?: string[];
};

function buildUrl(path: string) {
  if (API_BASE_URL) {
    return `${API_BASE_URL}${path}`;
  }

  return path;
}

function buildHeaders(initHeaders: RequestInit['headers'], auth?: boolean) {
  const headers = new Headers(initHeaders);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (auth) {
    if (BACKEND_BEARER_TOKEN) {
      headers.set('Authorization', `Bearer ${BACKEND_BEARER_TOKEN}`);
    }

    if (TEST_USER_ID) {
      headers.set('X-Test-User-Id', TEST_USER_ID);
    }
  }

  return headers;
}

export async function fetchApi<T>(
  path: string,
  init?: RequestInit & { auth?: boolean },
): Promise<T> {
  const { auth, headers, ...restInit } = init ?? {};
  const response = await fetch(buildUrl(path), {
    headers: buildHeaders(headers, auth),
    ...restInit,
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.error?.message || `Request failed with status ${response.status}`);
  }

  return payload.data;
}
