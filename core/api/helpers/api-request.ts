import { APIRequestContext } from '@playwright/test';

export type RequestOptions = Parameters<APIRequestContext['get']>[1];

export class ApiRequestBuilder {
  private _options: Record<string, any> = {};

  // Headers
  addHeader(key: string, value: string): this {
    this._options.headers = {
      ...this._options.headers,
      [key]: value,
    };
    return this;
  }

  addHeaders(headers: Record<string, string>): this {
    this._options.headers = {
      ...this._options.headers,
      ...headers,
    };
    return this;
  }

  // Query
  addQuery(params: Record<string, any>): this {
    this._options.params = {
      ...this._options.params,
      ...params,
    };
    return this;
  }

  // Body
  addBody<T>(data: T): this {
    this._options.data = data;
    return this;
  }

  // Support all Playwright options (IMPORTANT)
  addOption<K extends keyof RequestOptions>(
    key: K,
    value: RequestOptions[K]
  ): this {
    this._options[key] = value;
    return this;
  }

  build(): RequestOptions {
    return this._options;
  }
}

// helper
export const requestBuilder = () => new ApiRequestBuilder();