import { McDefault } from "~/types";

function getDefaultArg(asArray: boolean) {
  if (asArray) {
    return [McDefault.ArgSize, McDefault.ArgSize, McDefault];
  }
  return McDefault;
}

type T = Parameters<typeof getDefaultArg>;

export { getDefaultArg };
export type { T };
