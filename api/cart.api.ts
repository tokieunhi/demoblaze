import { APIRequestContext, APIResponse } from '@playwright/test';
import { config } from '../config/env.config';
import { API_ENDPOINTS } from '../constants/endpoints';
import type { AddToCartPayload } from './types';


export async function addProductToCart(
  request: APIRequestContext,
  payload: AddToCartPayload
): Promise<APIResponse> {
  const { token, productId, id, flag } = payload;
  return request.post(`${config.apiBaseUrl}${API_ENDPOINTS.ADD_TO_CART}`, {
    data: {
      id: id ?? crypto.randomUUID(),
      cookie: token,
      prod_id: productId,
      flag: flag ?? true,
    },
  });
}

export async function viewCart(
  request: APIRequestContext,
  token: string
): Promise<APIResponse> {
  return request.post(`${config.apiBaseUrl}${API_ENDPOINTS.VIEW_CART}`, {
    data: { cookie: token, flag: true },
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function resetCart(
  request: APIRequestContext,
  token: string
): Promise<APIResponse> {
  return request.post(`${config.apiBaseUrl}${API_ENDPOINTS.RESET_CART}`, {
    data: { cookie: token },
    headers: { 'Content-Type': 'application/json' },
  });
}
