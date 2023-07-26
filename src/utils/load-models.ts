// import { McDefault, McNameSpace } from "~/types";

import { isString } from "lodash";
import { McDefault, McNameSpace, McModel } from "~/types";

async function loadModel(
  name: string,
  parent: Record<any, any> = {}
): Promise<McModel> {
  let currentObj: McModel = {
    model: name,
  };

  const splitedName = name.split("/");
  name = splitedName[splitedName.length - 1].replace(
    McDefault.MinecraftTag,
    ""
  );

  try {
    const variantJson = await import(`../data/blockstates/${name}.json`).then(
      (res) => res.default
    );
    currentObj = {
      ...currentObj,
      ...variantJson,
    };
  } catch (e) {}

  try {
    const modelJson = await import(`../data/models/${name}.json`).then(
      (res) => res.default
    );

    currentObj = {
      ...currentObj,
      ...modelJson,
    };

    if (parent) {
      currentObj = {
        ...currentObj,
        parent: {
          model: name,
          ...parent,
        },
      };
    }

    if (modelJson.hasOwnProperty("parent")) {
      return await loadModel(modelJson["parent"], currentObj);
    }
  } catch (e) {}

  return currentObj;
}

async function loadModels(namespaces: McNameSpace[] | McNameSpace) {
  let modelArr: McModel[] = [];

  if (isString(namespaces)) {
    namespaces = [namespaces];
  }

  for (const name of namespaces) {
    const modelJson = await loadModel(name);
    modelArr.push({
      ...modelJson,
    });
  }

  return modelArr;
}

export { loadModels };
