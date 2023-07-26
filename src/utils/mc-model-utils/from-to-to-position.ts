import { McPosition } from "~/types";

function fromToToPosition(from: McPosition, to: McPosition) {
  return [0, 0, 0].map((_, index) => {
    let arg = to[index] - from[index];
    return arg / 2 - 16 / 2 + from[index];
  }) as McPosition;
}

export { fromToToPosition };
