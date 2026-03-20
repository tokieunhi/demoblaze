import { APIResponse } from "@playwright/test";
import { ApiRequestBuilder } from "../../core/api/helpers/api-request";
import { encodeBase64 } from "../../utils/string.util";
import { Header } from "../enum";
import { createApiClient } from "../../core/api/helpers/api-client";
import { getCommonApiContext } from "../api-context";
import { API_ENDPOINTS } from "../../constants/endpoints";

export class AuthService {
    async login(username: string, password: string): Promise<APIResponse> {
        const requestBuilder = new ApiRequestBuilder()
            .addHeader(Header.Key.ACCEPT, Header.Value.APPLICATION_JSON)
            .addBody({
                username,
                password: encodeBase64(password),
            })
            .build();

        const apiClient = createApiClient(await getCommonApiContext());
        return apiClient.post(API_ENDPOINTS.LOGIN, requestBuilder);
    }

    async generateToken(username: string, password: string): Promise<string> {
        const response = await this.login(username, password);
        const text = await response.text();
        const match = text.match(/Auth_token:\s*"?([^"]*)"?/i);
        if (match) {
            return match[1].trim();
        }
        throw new Error(text || `Login failed: ${response.status()}`);
    }
}
