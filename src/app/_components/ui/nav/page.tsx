"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const navToggle = () => {
    setIsOpen(!isOpen);
  };

  const navClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={navToggle}
        className={` text-black text-2xl w-10 h-10 fixed top-3 right-3 rounded-lg z-2  transition-all duration-300 transform`}
      >
        {isOpen ? <img src="/Vector2.svg" /> : <img src="/Vector.svg" />}
      </button>
      <nav
        className={`bg-gray-300 h-full w-50 fixed  top-0 right-0  z-1 transform transition-transform duration-300 ease-in-out flex  flex-col justify-center  items-center ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full flex  flex-col justify-center  items-center"
        }`}
      >
        <ul className="flex  flex-col justify-center  items-center">
          <li className="pr-5">
            <Link onClick={navClose} href="/">
              Home
            </Link>
          </li>
          <li className="pr-5">
            <Link onClick={navClose} href="/about">
              About
            </Link>
          </li>
          <li className="pr-5">
            <Link onClick={navClose} href="/blog">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
