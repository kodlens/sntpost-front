export const config = {
    apiToken: import.meta.env.VITE_API_TOKEN ?? '',
    baseUri: import.meta.env.VITE_API_URL ?? 'localhost',
    captchaSiteKey: import.meta.env.VITE_API_CAPTCHA_SITE_KEY ?? '',
}