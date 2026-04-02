export function getSiteImage(images, key, fallback) {
  return images?.[key] || fallback;
}