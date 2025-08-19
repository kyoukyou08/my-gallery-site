"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import { easing } from "maath";

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
        <line key={i} />
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
      [clicked === index ? 3 : scale[0], clicked === index ? 5 : 4 + y, 1],
      0.15,
      delta
    );
    if (ref.current.material && "scale" in ref.current.material) {
      const materialScale = ref.current.material.scale as THREE.Vector2;
      materialScale.x = ref.current.scale.x;
      materialScale.y = ref.current.scale.y;
    }

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
    }
  });

  return (
    <Image
      ref={ref}
      {...props}
      position={position}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
      url={url}
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
      <header className="flex justify-between  lg:py-3 py-8  lg:px-20 px-4 absolute top-0 right-0 h-[16px] w-screen">
        <div>
          <p className="text-slate-900 lg:text-4xl font-bold text-3xl">
            photo shelf
          </p>
        </div>
        <div>
          <ul className="hidden lg:flex col gap-4 font-bold ">
            <li>
              <a href="">about</a>
            </li>
            <li>
              <a href="">contact</a>
            </li>
          </ul>
        </div>
      </header>
      <div className="h-screen z-900">
        <Canvas
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => (state.clicked = null)}
        >
          <Items />
        </Canvas>
      </div>
      <footer className=" flex justify-end py-8 px-20 absolute bottom-0 w-screen ">
        <div className="font-bold text-3xl lg:text-5xl">sns</div>
      </footer>
    </div>
  );
}
