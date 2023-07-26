import { McDefault } from "~/types";

function multipyByDefaultArg(v: number): number {
  return v * McDefault.ArgSize;
}

type TmultipyByDefaultArg = Parameters<typeof multipyByDefaultArg>;

export { multipyByDefaultArg };
export type { TmultipyByDefaultArg };
