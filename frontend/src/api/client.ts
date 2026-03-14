export type ApiClientConfig = {
  baseUrl: string;
  getAccessToken?: () => string | null;
};

export class ApiClient {
  constructor(private readonly config: ApiClientConfig) {}

  async get<T>(path: string): Promise<T> {
    const token = this.config.getAccessToken?.();

    const response = await fetch(`${this.config.baseUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}

export const apiClient = new ApiClient({
  baseUrl: "/api/v1",
  getAccessToken: () => localStorage.getItem("access_token"),
});