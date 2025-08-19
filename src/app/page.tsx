"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";

const material = new THREE.LineBasicMaterial({ color: "white" });
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0),
]);

type StateType = {
  clicked: number | null;
  urls: string[];
};

const state = proxy<StateType>({
  clicked: null,
  urls: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 5, 7, 8, 2, 4, 9, 6].map(
    (u) => `/${u}.jpeg`
  ),
});

function Minimap() {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { urls } = useSnapshot(state);
  const { height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, index) => {
      const y = scroll.curve(
        index / urls.length - 1.5 / urls.length,
        4 / urls.length
      );
      const line = child as THREE.Line;
      easing.damp(line.scale, "y", 0.15 + y / 6, 0.15, delta);
    });
  });

  return (
    <group ref={ref}>
      {urls.map((_, i) => (
        <line
          key={i}
          args={[geometry]}
          material={material}
          position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  );
}
//写真単体での処理
type ItemProps = {
  index: number;
  position: [number, number, number];
  scale: [number, number, number];
  url: string;
};
function Item({ index, position, scale, url, ...props }: ItemProps) {
  const ref = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  const { clicked, urls } = useSnapshot(state);
  const [hovered, hover] = useState(false);

  const click = () => (state.clicked = index === clicked ? null : index);
  const over = () => hover(true);
  const out = () => hover(false);

  useFrame((frameState, delta) => {
    if (!ref.current) return;

    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );
    //拡大
    easing.damp3(
      ref.current.scale,
      [clicked === index ? 3.5 : scale[0], clicked === index ? 5 : 4 + y, 1],
      0.15,
      delta
    );
    //位置調整
    if (clicked !== null && index < clicked)
      easing.damp(ref.current.position, "x", position[0] - 2, 0.15, delta);
    if (clicked !== null && index > clicked)
      easing.damp(ref.current.position, "x", position[0] + 2, 0.15, delta);
    if (clicked === null || clicked === index)
      easing.damp(ref.current.position, "x", position[0], 0.15, delta);

    //選択してる要素の強調：少し白くする
    if (ref.current.material) {
      easing.damp(
        ref.current.material,
        "grayscale",
        hovered || clicked === index ? 0 : Math.max(0, 1 - y),
        0.15,
        delta
      );

      easing.dampC(
        ref.current.material.color,
        hovered || clicked === index ? "white" : "#aaa",
        hovered ? 0.3 : 0.15,
        delta
      );
    }
  });

  return (
    <Image
      ref={ref}
      {...props}
      position={position}
      scale={scale as [number, number, number]}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
      url={url}
      alt="photo"
    />
  );
}
//並べたときの処理

type ItemsProps = {
  w?: number;
  gap?: number;
};

function Items({ w = 0.7, gap = 0.15 }: ItemsProps) {
  const { urls } = useSnapshot(state);
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;

  return (
    <ScrollControls
      horizontal
      damping={0.1}
      pages={(width - xW + urls.length * xW) / width}
    >
      <Minimap />
      <Scroll>
        {urls.map((url, i) => (
          <Item
            key={i}
            index={i}
            position={[i * xW, 0, 0]}
            scale={[w, 4, 1]}
            url={url}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

export default function Home() {
  return (
    <div className="w-full h-screen bg-amber-50">
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        onPointerMissed={() => (state.clicked = null)}
      >
        <Items />
      </Canvas>
    </div>
  );
}
