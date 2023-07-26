import { isObject } from "lodash";
import { McModel } from "~/types";

function recursiveModel(
  model: McModel,
  cb?: (model: McModel) => any,
  prevResult?: any[]
): any[] {
  if (!cb) {
    cb = (_: McModel) => _;
  }

  let result = [...(prevResult || [])];
  let currentResult = cb(model);
  currentResult && result.push(currentResult);

  if (isObject(model?.parent)) {
    return recursiveModel(model.parent, cb, result);
  }

  if (isObject(model?.elements)) {
    for (let index = 0; index < model.elements.length; index++) {
      const x = recursiveModel(model.elements[index], cb, result);
      x && result.push(x);
    }
  }

  return result;
}

type TrecursiveModel = Parameters<typeof recursiveModel>;

export { recursiveModel };
export type { TrecursiveModel };
