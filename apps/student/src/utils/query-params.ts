import { redirect } from "react-router-dom";

export interface LoaderData<T> {
  params: T;
}

export type QueryParamParser<T> = {
  parse: (params: URLSearchParams) => T;
  validate?: (data: T) => boolean;
  onValidationFail?: (url: URL) => never;
};

export function parseQueryParams<T>(
  request: Request,
  parser: QueryParamParser<T>
): T {
  const url = new URL(request.url);
  const params = url.searchParams;

  const result = parser.parse(params);

  if (parser.validate && !parser.validate(result)) {
    if (parser.onValidationFail) {
      parser.onValidationFail(url);
    } else {
      throw redirect(url.pathname);
    }
  }

  return result;
}

export function parseOptionalString(value: string | null): string | undefined {
  return value || undefined;
}

export function parseOptionalNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}

export function parseOptionalBoolean(
  value: string | null
): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function parseEnum<T extends string>(
  value: string | null,
  allowedValues: readonly T[]
): T | undefined {
  if (!value) return undefined;
  return allowedValues.includes(value as T) ? (value as T) : undefined;
}
