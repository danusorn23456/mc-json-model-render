import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { McModel } from "~/types";
import { McUtils } from "~/utils";

export interface Model {
  model: McModel;
  spin?: boolean;
  bounding?: boolean;
}

const Model = ({ model, spin, bounding }: Model) => {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    function recursiveDrawBlock(model: McModel) {
      if (model?.from && model?.to) {
        const args = McUtils.fromToToCoordinates(model.from, model.to);
        const position = McUtils.fromToToPosition(model.from, model.to);

        const geometry = new BoxGeometry(...args);
        const material = new MeshStandardMaterial({ transparent: true });
        const mesh = new Mesh(geometry, material);

        mesh.position.set(...position);

        if (model.rotation) {
          mesh.rotation[model.rotation.axis as "x" | "y" | "z"] =
            -MathUtils.degToRad(model.rotation.angle);
        }

        material.color.set("#242424");

        groupRef.current?.add(mesh);
      }

      if (model.elements) {
        for (const key in model.elements) {
          const currentModel = model.elements[key];
          recursiveDrawBlock(currentModel);
        }
      }

      if (model?.parent instanceof Object) {
        recursiveDrawBlock(model.parent);
        if (model.parent.elements) {
          for (const key in model.parent.elements) {
            const currentModel = model.parent.elements[key];
            recursiveDrawBlock(currentModel);
          }
        }
      }
    }

    recursiveDrawBlock(model);

    if (bounding) {
      const geometry = new BoxGeometry(16, 16, 16);
      const material = new MeshStandardMaterial({
        color: "#ff0000",
        wireframe: true,
      });
      const mesh = new Mesh(geometry, material);
      groupRef.current?.add(mesh);
    }

    if (spin)
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
