import type { LoaderFunctionArgs } from "react-router-dom";

export interface ConnectReviewLoaderData {
  companyName: string;
  recruitmentId?: string;
}

export async function connectReviewLoader({
  request
}: LoaderFunctionArgs): Promise<ConnectReviewLoaderData> {
  const url = new URL(request.url);
  const companyName = url.searchParams.get("companyName") || "회사";
  const recruitmentId = url.searchParams.get("recruitmentId") || undefined;

  return {
    companyName,
    recruitmentId
  };
}
