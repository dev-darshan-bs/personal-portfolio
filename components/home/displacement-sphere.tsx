"use client";

import { useReducedMotion, useSpring } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import {
  AmbientLight,
  DirectionalLight,
  IUniform,
  Light,
  LinearSRGBColorSpace,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  UniformsUtils,
  Vector2,
  WebGLRenderer,
} from "three";

import { Transition } from "@/components/core/transition";
import { useInViewport } from "@/hooks/use-in-viewport";
import { useSiteTheme } from "@/hooks/use-site-theme";
import { useWindowSize } from "@/hooks/use-window-size";
import { media } from "@/lib/style";
import { cleanRenderer, cleanScene, removeLights } from "@/lib/three";
import { throttle } from "@/lib/throttle";
import styles from "./displacement-sphere.module.css";
import { fragmentShader, vertexShader } from "./shaders";

const springConfig = {
  stiffness: 30,
  damping: 20,
  mass: 2,
};

type Uniforms = Record<string, IUniform> & { time: IUniform<number> };

export const DisplacementSphere = (props: ComponentPropsWithoutRef<"canvas">) => {
  const { theme } = useSiteTheme();
  const start = useRef(Date.now());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<Vector2>(new Vector2(0.8, 0.5));
  const renderer = useRef<WebGLRenderer>(null);
  const camera = useRef<PerspectiveCamera>(null);
  const scene = useRef<Scene>(null);
  const lights = useRef<Light[]>(null);
  const uniforms = useRef<Uniforms>(null);
  const material = useRef<MeshPhongMaterial>(null);
  const geometry = useRef<SphereGeometry>(null);
  const sphere = useRef<Mesh>(null);
  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);
  const windowSize = useWindowSize();
  const rotationX = useSpring(0, springConfig);
  const rotationY = useSpring(0, springConfig);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { innerWidth, innerHeight } = window;
    mouse.current = new Vector2(0.8, 0.5);

    try {
      renderer.current = new WebGLRenderer({
        canvas: canvasRef.current,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: process.env.NEXT_PUBLIC_ALLOW_SOFTWARE_GL !== "1",
      });
    } catch {
      // WebGL unavailable; leave the hero without the sphere.
      return;
    }

    renderer.current.setSize(innerWidth, innerHeight);
    renderer.current.setPixelRatio(1);
    renderer.current.outputColorSpace = LinearSRGBColorSpace;

    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
    camera.current.position.z = 52;

    scene.current = new Scene();

    material.current = new MeshPhongMaterial();
    material.current.onBeforeCompile = (shader) => {
      uniforms.current = UniformsUtils.merge([
        shader.uniforms,
        { time: { value: 0 } },
      ]) as Uniforms;

      shader.uniforms = uniforms.current;
      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    };

    geometry.current = new SphereGeometry(32, 128, 128);
    sphere.current = new Mesh(geometry.current, material.current);
    sphere.current.position.z = 0;
    scene.current.add(sphere.current);

    return () => {
      cleanScene(scene.current ?? undefined);
      cleanRenderer(renderer.current ?? undefined);
    };
  }, []);

  useEffect(() => {
    if (!scene.current) return;

    const dirLight = new DirectionalLight(0xffffff, theme === "light" ? 1.8 : 2.0);
    const ambientLight = new AmbientLight(0xffffff, theme === "light" ? 2.7 : 0.4);

    dirLight.position.z = 200;
    dirLight.position.x = 100;
    dirLight.position.y = 100;

    lights.current = [dirLight, ambientLight];
    lights.current.forEach((light) => scene.current?.add(light));

    return () => {
      removeLights(lights.current ?? undefined);
    };
  }, [theme]);

  useEffect(() => {
    if (!renderer.current || !camera.current || !sphere.current || !scene.current) {
      return;
    }

    const { width, height } = windowSize;

    const adjustedHeight = height + height * 0.3;
    renderer.current.setSize(width, adjustedHeight);
    camera.current.aspect = width / adjustedHeight;
    camera.current.updateProjectionMatrix();

    // Render a single frame on resize when not animating
    if (reduceMotion) {
      renderer.current.render(scene.current, camera.current);
    }

    if (width <= media.mobile) {
      sphere.current.position.x = 14;
      sphere.current.position.y = 10;
    } else if (width <= media.tablet) {
      sphere.current.position.x = 18;
      sphere.current.position.y = 14;
    } else {
      sphere.current.position.x = 22;
      sphere.current.position.y = 16;
    }
  }, [reduceMotion, windowSize]);

  useEffect(() => {
    const onMouseMove = throttle((event: MouseEvent) => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };

      rotationX.set(position.y / 2);
      rotationY.set(position.x / 2);
    }, 100);

    if (!reduceMotion && isInViewport) {
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

  useEffect(() => {
    let animation: number;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      if (!renderer.current || !scene.current || !camera.current || !sphere.current) {
        return;
      }

      if (uniforms.current) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
      }

      sphere.current.rotation.z += 0.001;
      sphere.current.rotation.x = rotationX.get();
      sphere.current.rotation.y = rotationY.get();

      renderer.current.render(scene.current, camera.current);
    };

    if (!reduceMotion && isInViewport) {
      animate();
    } else if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);
    }

    return () => {
      cancelAnimationFrame(animation);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

  return (
    <Transition in timeout={3000} nodeRef={canvasRef}>
      {({ visible }) => (
        <canvas
          aria-hidden
          className={styles.canvas}
          data-visible={visible}
          ref={canvasRef}
          {...props}
        />
      )}
    </Transition>
  );
};
