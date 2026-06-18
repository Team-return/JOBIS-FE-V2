import type { LoaderFunctionArgs } from "react-router-dom";

export interface ConnectReviewLoaderData {
  companyName: string;
  interviewId?: string;
  documentNumberId?: string;
}

export async function connectReviewLoader({
  request
}: LoaderFunctionArgs): Promise<ConnectReviewLoaderData> {
  const url = new URL(request.url);
  const companyName = url.searchParams.get("companyName") || "회사";
  const interviewId = url.searchParams.get("interviewId") || undefined;
  const documentNumberId =
    url.searchParams.get("documentNumberId") || undefined;

  return {
    companyName,
    interviewId,
    documentNumberId
  };
}
