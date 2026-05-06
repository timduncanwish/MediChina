/**
 * Input validation and sanitization utilities.
 */

/** Strip HTML tags and trim whitespace */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .trim();
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate phone format (loose — accepts international formats) */
export function isValidPhone(phone: string): boolean {
  return /^[+\d\s\-().]{6,20}$/.test(phone);
}

/** Sanitize an array of strings */
export function sanitizeStringArray(arr: string[]): string[] {
  return arr.map(sanitizeText).filter(Boolean);
}

/** Build a safe object with only allowed keys and sanitized values */
export function pickAndSanitize<T extends Record<string, unknown>>(
  input: Record<string, unknown>,
  schema: { [K in keyof T]: "string" | "number" | "boolean" | "string[]" }
): Partial<T> {
  const result: Record<string, unknown> = {};

  for (const [key, type] of Object.entries(schema)) {
    if (!(key in input)) continue;
    const value = input[key];

    switch (type) {
      case "string":
        if (typeof value === "string") result[key] = sanitizeText(value);
        break;
      case "number":
        if (typeof value === "number" && isFinite(value)) result[key] = value;
        break;
      case "boolean":
        if (typeof value === "boolean") result[key] = value;
        break;
      case "string[]":
        if (Array.isArray(value))
          result[key] = sanitizeStringArray(value as string[]);
        break;
    }
  }

  return result as Partial<T>;
}
