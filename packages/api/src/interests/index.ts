import { createDomainApi } from "@/create-hook";
import type { InterestsResponse } from "./types";
import { interestsKeys } from "./keys";

const DOMAIN = "/interests";
const { createQueryHook } = createDomainApi(DOMAIN);

export { interestsKeys };

export const useInterests = createQueryHook<void, InterestsResponse>({
  path: "/recruitment",
  queryKey: interestsKeys.interests
});
