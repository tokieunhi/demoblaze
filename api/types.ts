export interface AddToCartPayload {
  id?: string;
  productId: number | string;
  token: string;
  flag?: boolean;
}

export interface ViewCartResponse {
  Items?: { prod_id: number; id: string }[];
}
