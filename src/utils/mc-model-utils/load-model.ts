import { isArray, mergeWith } from "lodash";
import { McModel, McDirectory, McDefault } from "~/types";
import { MathUtils } from "three";

async function loadFile<T = any>(
  name: string,
  directory: McDirectory
): Promise<Awaited<T> | {}> {
  name = name.replace(McDefault.Tag, "");
  name = name.replace(/block\//, "");

  let file: Awaited<T | {}> = {};

  try {
    file = await import(`../../data/${directory}/${name}.json`).then(
      (res) => res.default as T
    );
  } catch (e) {}

  return file;
}

async function loadModel(name: string, parent?: McModel): Promise<McModel> {
  let currentModel: McModel = parent || {
    model: name,
  };
  MathUtils;
  try {
    const variantJson = await loadFile(name, "blockstates");

    currentModel = {
      ...currentModel,
      ...variantJson,
    };
  } catch (e) {}

  try {
    const nextModel = await loadFile(name, "models");

    currentModel = mergeWith(
      currentModel,
      nextModel,
      (objValue: any, srcValue: any) => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }
    );

    if (nextModel.hasOwnProperty("parent")) {
      return await loadModel(nextModel["parent"], currentModel);
    }
  } catch (e) {}

  return currentModel;
}

export { loadModel };
