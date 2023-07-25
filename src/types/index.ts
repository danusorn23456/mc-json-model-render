import {
  BoxGeometryProps,
  MeshProps,
  MeshStandardMaterialProps,
} from "@react-three/fiber";

export enum McEnum {
  MinecraftTag = "minecraft:",
}

export type McSide = "front" | "back" | " left" | "right" | "up" | "down";
export type McDirection = "north" | "east" | "south" | "west";
export type McCondition = "OR" | "AND";
export type McNameSpace = string;

export type McModelMap = Record<string, McModel>;
export type McDirectionWith<T> = Partial<Record<McDirection, T>>;
export type McConditionWith<T> = Record<McCondition, T>;

export type McPosition = [x: number, y: number, z: number];
export type McDimension = [x: number, y: number, z: number];
export type McUV = number[];

export type McTexture = Partial<Record<string & "model", string>> | string;

export type McTransformProps = {
  rotation?: McPosition;
  scale?: number;
  translation?: McPosition;
};

export type McFaceProps = McTransformProps & {
  cullface?: McSide;
  texture?: McTexture;
  uv?: McUV;
};

export type McFaces = McDirectionWith<McFaceProps>;

export type McMaterialProps = {
  faces?: McFaces;
};

export type McGeometryProps = {
  from?: McPosition;
  to?: McPosition;
};

export type McMultiPart = {
  when: McConditionWith<McDirectionWith<string>>;
  apply: McModel;
};

export type McModel = McGeometryProps & {
  model: string;
  __comment?: string;
  ambientocclusion?: boolean;
  x?: number;
  y?: number;
  uvlock?: boolean;
  weight?: number;
  parent?: string;
  display?: McDisplay;
  elements?: McModel[];
};

export type McDisplay = {
  fixed?: McTransformProps;
  firstperson_lefthand: McTransformProps;
  firstperson_righthand: McTransformProps;
  gui: McTransformProps;
  ground: McTransformProps;
  third_righthand: McTransformProps;
  gui_light: McTransformProps;
};

export type McBlockState = {
  variants?: McModelMap;
  multipart?: McMultiPart;
};

export type McSimplifyModel = Omit<McModel, "parent"> & {
  parent?: McModel;
};

export type McModelMeshProps = {
  meshProps: Omit<MeshProps, "position"> & {
    position?: McPosition;
  };
  geometryProps: BoxGeometryProps;
  materialProps: MeshStandardMaterialProps;
};
