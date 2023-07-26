import { Canvas } from "@react-three/fiber";
import { ChangeEvent, useEffect, useState } from "react";
import { loadModels } from "./utils";
import { McModel } from "./types";
import { Model, TextInput } from "./component";

function App() {
  const [blockName, setBlockName] = useState("lectern");
  const [model, setModel] = useState<McModel>();

  useEffect(() => {
    if (!blockName) {
      return setModel(undefined);
    }

    async function loadModel() {
      const model: McModel[] = await loadModels([blockName]);
      setModel(model[0]);
    }

    try {
      loadModel();
    } catch (e) {
      setModel(undefined);
    }
  }, [blockName]);

  function handleChangeBlockName(e: ChangeEvent<HTMLInputElement>) {
    setBlockName(e.target.value);
  }

  return (
    <div style={{ width: "100svw", height: "100svh" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 900,
        }}
      >
        <TextInput
          label="model name in '~models/block'"
          onChange={handleChangeBlockName}
          delay={300}
        />
      </div>
      <Canvas style={{ width: "100%", height: "100%", background: "white" }}>
        <scene>
          <camera rotation={[0.5, -1, 0]} position={[0, 0, -64]}>
            <ambientLight />
            <pointLight position={[-4, 10, 0]} />
            {model && <Model model={model} spin bounding />}
          </camera>
        </scene>
      </Canvas>
    </div>
  );
}

export default App;
