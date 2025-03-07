const productGetUtmParams = (
  platform: 'desktop' | 'mobile' | 'tablet' = 'mobile'
) => `?utm_campaign=productShare&utm_medium=web_${platform}&utm_source=sharing`;

export { productGetUtmParams };
