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
  let returnValue = cb(model);
  returnValue && result.push(returnValue);

  if (isObject(model?.parent)) {
    let returnValue = recursiveModel(model.parent, cb, result);
    returnValue && result.push(returnValue);
  }

  if (isObject(model?.elements)) {
    for (let index = 0; index < model.elements.length; index++) {
      let returnValue = recursiveModel(model.elements[index], cb, result);
      returnValue && result.push(returnValue);
    }
  }

  return result;
}

type TrecursiveModel = Parameters<typeof recursiveModel>;

export { recursiveModel };
export type { TrecursiveModel };
