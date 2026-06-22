import { useNoticeList } from "@jobis/api";
import type { LoaderData } from "../../utils";

export async function noticesListLoader(): Promise<LoaderData<undefined>> {
  await useNoticeList.prefetch();

  return { params: undefined };
}
