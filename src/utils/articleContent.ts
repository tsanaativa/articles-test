import sanitizeHtml from "sanitize-html";

const defaultOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "b",
    "br",
    "i",
    "em",
    "strong",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "img",
    "span",
    "li",
    "ol",
  ],
  allowedAttributes: {
    "*": ["style"],
    a: ["href"],
    img: ["src", "alt", "title", "width", "height", "loading"],
  },
  allowedSchemes: ["https"],
};

export function sanitizeHtmlString(dirty: string): string {
  return sanitizeHtml(dirty, defaultOptions);
}

export function convertStringToHtml(str: string): string {
  try {
    return decodeURIComponent(JSON.parse(str));
  } catch (err) {
    return decodeURIComponent(str);
  }
}

export function getProcessedArticleContent(content: string) {
  return sanitizeHtmlString(convertStringToHtml(content));
}

export function stripHtmlTags(content: string) {
  return getProcessedArticleContent(content).replace(/(<([^>]+)>)/gi, "");
}
