import { APIRequestContext, APIResponse } from '@playwright/test';

export type RequestOptions = Parameters<APIRequestContext['get']>[1];

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  async get(url: string, options?: RequestOptions): Promise<APIResponse> {
    console.log(`[API] GET ${url} with options ${JSON.stringify(options)}`);
    return this.request.get(url, options);
  }

  async post(url: string, options?: RequestOptions): Promise<APIResponse> {
    console.log(`[API] POST ${url} with options ${JSON.stringify(options)}`);
    return this.request.post(url, options);
  }

  async put(url: string, options?: RequestOptions): Promise<APIResponse> {
    console.log(`[API] PUT ${url} with options ${JSON.stringify(options)}`);
    return this.request.put(url, options);
  }

  async delete(url: string, options?: RequestOptions): Promise<APIResponse> {
    console.log(`[API] DELETE ${url} with options ${JSON.stringify(options)}`);
    return this.request.delete(url, options);
  }

  async disposeClient(): Promise<void> {
    await this.request.dispose();
  }
}

export function createApiClient (request: APIRequestContext) {
    return new ApiClient(request);
}