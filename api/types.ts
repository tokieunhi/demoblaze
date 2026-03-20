export interface AddToCartPayload {
  id?: string;
  cookie: string;
  prod_id: number | string;
  flag?: boolean;
}

export interface AddToCartResponse {
  errorMessage?: string;
}

export interface ViewCartResponse {
  Items?: { prod_id: number; id: string }[];
  errorMessage?: string;
}
