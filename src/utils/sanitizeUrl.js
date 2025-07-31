export function sanitizeUrl(input) {
    if (!input) return "";
  
    let url = input.trim();
  
    // Add https:// if no scheme is present
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
  
    try {
      const parsed = new URL(url);
      return parsed.href;
    } catch (e) {
      return ""; // Invalid URL
    }
  }
  