import { McDefault } from "~/types";

function nameWithoutTag(name: string): string {
  return name.replace(McDefault.Tag, "");
}

type NameWithoutTag = Parameters<typeof nameWithoutTag>;

export { nameWithoutTag };
export type { NameWithoutTag };
