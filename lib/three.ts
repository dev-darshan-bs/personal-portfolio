import type { Light, Material, Object3D, Scene, WebGLRenderer } from "three";

/** Clean up and dispose of a material */
export const cleanMaterial = (material: Material) => {
  material.dispose();

  for (const key of Object.keys(material)) {
    const value = (material as unknown as Record<string, unknown>)[key];
    if (value && typeof value === "object" && "minFilter" in value) {
      (value as unknown as { dispose: () => void }).dispose();
    }
  }
};

/** Clean up a scene's materials and geometry */
export const cleanScene = (scene?: Scene) => {
  scene?.traverse((object: Object3D) => {
    const mesh = object as Object3D & {
      isMesh?: boolean;
      geometry?: { dispose: () => void };
      material?: Material | Material[];
    };

    if (!mesh.isMesh) return;

    mesh.geometry?.dispose();

    if (Array.isArray(mesh.material)) {
      for (const material of mesh.material) cleanMaterial(material);
    } else if (mesh.material) {
      cleanMaterial(mesh.material);
    }
  });
};

/** Clean up and dispose of a renderer */
export const cleanRenderer = (renderer?: WebGLRenderer) => {
  renderer?.dispose();
};

/** Clean up lights by removing them from their parent */
export const removeLights = (lights?: Light[]) => {
  if (!lights) return;
  for (const light of lights) {
    light.parent?.remove(light);
  }
};
