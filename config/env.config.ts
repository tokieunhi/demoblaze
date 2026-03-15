/**
 * Central configuration management for the automation framework.
 * Supports environment-specific overrides via env vars.
 */

export const config = {
  apiBaseUrl: 'https://api.demoblaze.com',
  testTimeout: parseInt(process.env.TEST_TIMEOUT || '60000', 10),
  visibleTimeout: parseInt(process.env.VISIBLE_TIMEOUT || '10000', 10)
}
