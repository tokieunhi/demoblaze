import { APIResponse } from "@playwright/test";
import { API_ENDPOINTS } from "../../constants/endpoints";
import { getCommonApiContext } from "../api-context";
import { Header } from "../enum";
import { createApiClient } from "../../core/api/helpers/api-client";
import { ApiRequestBuilder } from "../../core/api/helpers/api-request";
import { AddToCartPayload } from "../types";

export class CartService {
  async addProductToCart(payload: AddToCartPayload): Promise<APIResponse> {
    const requestBuilder = new ApiRequestBuilder()
      .addHeader(Header.Key.ACCEPT, Header.Value.APPLICATION_JSON)
      .addBody({
        id: payload.id || crypto.randomUUID(),
        cookie: payload.cookie,
        prod_id: payload.prod_id,
        flag: payload.flag ?? true,
      })
      .build();

    const apiClient = createApiClient(await getCommonApiContext());
    return apiClient.post(API_ENDPOINTS.ADD_TO_CART, requestBuilder);

  }

  async viewCart(token: string): Promise<APIResponse> {
    const requestBuilder = new ApiRequestBuilder()
      .addHeader(Header.Key.ACCEPT, Header.Value.APPLICATION_JSON)
      .addBody({
        cookie: token,
      })
      .build();

    const apiClient = createApiClient(await getCommonApiContext());
    return apiClient.post(API_ENDPOINTS.VIEW_CART, requestBuilder);
  }

  async deleteCart(token: string): Promise<APIResponse> {
    const requestBuilder = new ApiRequestBuilder()
      .addHeader(Header.Key.ACCEPT, Header.Value.APPLICATION_JSON)
      .addBody({
        cookie: token,
      })
      .build();

    const apiClient = createApiClient(await getCommonApiContext());
    return apiClient.post(API_ENDPOINTS.DELETE_CART, requestBuilder);
  }
}
