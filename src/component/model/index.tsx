import { useFrame } from "@react-three/fiber";
import { isArray } from "lodash";
import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  Group,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from "three";
import { McModel, McPosition } from "~/types";
import { McModelUtils } from "~/utils";

export interface Model {
  model: McModel;
  positions: McPosition | McPosition[];
  spin?: boolean;
  bounding?: boolean;
}

const Model = ({ model, positions, spin, bounding }: Model) => {
  const groupRef = useRef<Group>(null);

  if (!isArray(positions?.[0])) {
    positions = [positions as McPosition];
  }

  useEffect(
    function setupBounding() {
      if (bounding) {
        const geometry = new BoxGeometry(16, 16, 16);
        const material = new MeshStandardMaterial({
          color: "#ff0000",
          wireframe: true,
        });
        const mesh = new Mesh(geometry, material);
        groupRef.current?.add(mesh);
      }
    },
    [bounding]
  );

  useEffect(() => {
    function drawBlock(model: McModel) {
      if (model?.from && model?.to) {
        const args = McModelUtils.fromToToCoordinates(model.from, model.to);
        const position = McModelUtils.fromToToPosition(model.from, model.to);

        const geometry = new BoxGeometry(...args);
        const material = new MeshStandardMaterial({ transparent: true });
        const mesh = new InstancedMesh(geometry, material, positions.length);

        material.color.set("#242424");

        // Instanced Loop
        for (let index = 0; index < positions.length; index++) {
          const currentPosition = positions[index] as McPosition;
          const temp = new Object3D();

          if (model.rotation) {
            temp.rotation[model.rotation.axis as "x" | "y" | "z"] =
              -MathUtils.degToRad(model.rotation.angle);
          }
          // model position
          temp.position.set(...position);
          // world position
          temp.position.add(
            new Vector3().fromArray(
              currentPosition.map((v) => McModelUtils.multipyByDefaultArg(v))
            )
          );

          temp.updateMatrix();

          mesh.setMatrixAt(index, temp.matrix);
        }

        groupRef.current?.add(mesh);
      }
    }

    if (model.elements) {
      for (const key in model.elements) {
        const currentModel = model.elements[key];
        drawBlock(currentModel);
      }
    }

    return () => {
      groupRef.current?.clear();
    };
  });

  useFrame((_, delta) => {
    if (!spin || !groupRef.current) return;
    groupRef.current.rotation.y -= delta;
  });

  return <group ref={groupRef}></group>;
};

export { Model };
