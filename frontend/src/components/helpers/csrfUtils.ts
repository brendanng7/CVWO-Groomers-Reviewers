export function getCsrfToken(): string | null {
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  
  if (metaTag) {
    return metaTag.getAttribute('content');
  } else {
    console.error('CSRF token meta tag not found.');
    return null;
  }
}
