import { APIRequestContext, request } from '@playwright/test';

export async function getCommonApiContext(): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: process.env.API_BASE_URL
  });
}
