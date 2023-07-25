// import { McEnum, McNameSpace } from "~/types";

import { isString } from "lodash";
import { McEnum, McNameSpace, McSimplifyModel } from "~/types";

async function loadModelJSON(
  name: string,
  parent: Record<any, any> = {}
): Promise<McSimplifyModel> {
  let currentObj: McSimplifyModel = {
    model: name,
  };

  const splitedName = name.split("/");
  name = splitedName[splitedName.length - 1].replace(McEnum.MinecraftTag, "");

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
      return await loadModelJSON(modelJson["parent"], currentObj);
    }
  } catch (e) {}

  return currentObj;
}

async function loadModels(namespaces: McNameSpace[] | McNameSpace) {
  let modelArr: McSimplifyModel[] = [];

  if (isString(namespaces)) {
    namespaces = [namespaces];
  }

  for (const name of namespaces) {
    const modelJson = await loadModelJSON(name);
    modelArr.push({
      ...modelJson,
    });
  }

  return modelArr;
}

export { loadModels };
