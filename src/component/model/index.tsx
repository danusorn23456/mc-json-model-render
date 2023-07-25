import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";
import { McModel, McModelMeshProps, McSimplifyModel } from "~/types";
import { getModelMeshProps } from "~/utils";

export interface Model {
  model: McSimplifyModel;
  spin?: boolean;
}

const Model = ({ model, spin }: Model) => {
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    function recursiveGetModelMeshProps(
      model: McSimplifyModel | McModel,
      prev?: McModelMeshProps[]
    ): McModelMeshProps[] {
      let returnValue = [...(prev || [])];

      if (model?.elements) {
        for (const key in model.elements) {
          const currentModal = model.elements[key];
          returnValue.push(
            getModelMeshProps(
              currentModal,
              currentModal.model || currentModal.__comment
            )
          );
        }
      }

      if (model?.parent instanceof Object) {
        return recursiveGetModelMeshProps(model.parent, returnValue);
      }

      return returnValue;
    }

    const modelMeshs = recursiveGetModelMeshProps(model);

    for (let index = 0; index < modelMeshs.length; index++) {
      const {
        geometryProps: { args = [16, 16, 16] },
        meshProps: { name = "", position, rotation },
      } = modelMeshs[index];

      const isBounding =
        args.every((v) => v === args[0]) && modelMeshs.length > 1;

      const geometry = new BoxGeometry(...args);
      const material = new MeshStandardMaterial({ transparent: true });
      const mesh = new Mesh(geometry, material);

      material.color.set("#242424");

      if (isBounding) {
        material.wireframe = true;
      } else {
        mesh.name = name;
        mesh.rotation.set(...rotation.value);
        mesh.position.set(...position);
      }

      groupRef.current?.add(mesh);
      groupRef.current?.updateMatrix();
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
