export const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN ?? "";
export const SHOPIFY_STOREFRONT_API_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN ?? "";

export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  shopifyStoreDomain: SHOPIFY_STORE_DOMAIN,
  shopifyStorefrontApiAccessToken: SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
};
