import { McPosition } from "~/types";

function fromToToCoordinates(from: McPosition, to: McPosition) {
  const args = [0, 0, 0].map((_, index) => {
    return to[index] - from[index];
  }) as McPosition;
  return args;
}

export { fromToToCoordinates };
