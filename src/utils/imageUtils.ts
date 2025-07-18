/**
 * Gets an image URL with cache busting
 * @param path Path to the image in the public folder (e.g., '/img/profile.jpg')
 * @returns URL with a version query parameter
 */
export const getImageUrl = (path: string): string => {
  // In development, we don't need cache busting
  if (import.meta.env.DEV) {
    return path;
  }
  
  // In production, add a timestamp as a query parameter
  // This will be replaced with a build hash during the build process
  const version = import.meta.env.VITE_APP_BUILD_TIME || Date.now();
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}v=${version}`;
};
