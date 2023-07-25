import { McDimension, McModel, McPosition, McModelMeshProps } from "~/types";

const geometryArg = 16;

const defaultGeometryArgs: McDimension = [
  geometryArg,
  geometryArg,
  geometryArg,
];

function getModelMeshProps(model: McModel, name?: string): McModelMeshProps {
  const object3D: McModelMeshProps = {
    geometryProps: {},
    meshProps: {},
    materialProps: {},
  };

  const { from = [0, 0, 0], to = defaultGeometryArgs } = model;
  const args: McDimension = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];

  const [width, height, depth] = args;

  const offsetHeight = (16 - height) / 2;
  const offsetWidth = (16 - width) / 2;
  const offsetDepth = (16 - depth) / 2;

  const position: McPosition = [
    from[0] - offsetWidth,
    from[1] - offsetHeight,
    from[2] - offsetDepth,
  ];

  object3D.meshProps = {
    name: name,
    position,
  };

  object3D.geometryProps = {
    args,
  };

  return object3D;
}

export { getModelMeshProps };
