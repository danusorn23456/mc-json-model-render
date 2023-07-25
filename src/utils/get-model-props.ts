import { McDimension, McModel, McPosition, McModelMeshProps } from "~/types";

const geometryArg = 16;

const defaultGeometryArgs: McDimension = [
  geometryArg,
  geometryArg,
  geometryArg,
];

function getModelMeshProps(model: McModel, name?: string): McModelMeshProps {
  const object3D: McModelMeshProps = {
    geometryProps: {
      args: [geometryArg, geometryArg, geometryArg],
    },
    meshProps: {
      position: [0, 0, 0],
      rotation: {
        value: [0, 0, 0],
        origin: [0, 0, 0],
      },
    },
    materialProps: {},
  };

  const { from = [0, 0, 0], to = defaultGeometryArgs, rotation } = model;

  const args: McDimension = [to[0] - from[0], to[1] - from[1], to[2] - from[2]];

  if (rotation?.axis === "x") {
    object3D.meshProps!.rotation!.value[0] = -rotation.angle * (Math.PI / 180);
  }

  let offset = [
    (geometryArg - args[0]) / 2,
    (geometryArg - args[1]) / 2,
    (geometryArg - args[2]) / 2,
  ];

  if (rotation?.origin) {
    object3D.meshProps.rotation.origin = rotation.origin;
  }

  const position: McPosition = [
    from[0] - offset[0],
    from[1] - offset[1],
    from[2] - offset[2],
  ];

  object3D.meshProps.name = name;
  object3D.meshProps.position = position;
  object3D.geometryProps.args = args;

  return object3D;
}

export { getModelMeshProps };
