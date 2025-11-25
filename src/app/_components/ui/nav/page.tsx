"use client";
import React, { useState } from "react";
import Link from "next/link";

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
        className={` text-black text-2xl w-12 h-10 fixed top-3 right-3 rounded-lg z-2  transition-all duration-300 transform`}
      >
        <span
          className={
            isOpen
              ? "border-3 border-amber-600 bg-amber-600"
              : "border-3 border-amber-600 bg-amber-50"
          }
        >
          　
        </span>
      </button>
      <nav
        className={`bg-neutral-600 h-full w-50 fixed  top-0 right-0  z-1 transform transition-transform duration-300 ease-in-out flex  flex-col justify-center  items-center ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full flex  flex-col justify-center  items-center"
        }`}
      >
        <ul className="flex  flex-col gap-8  justify-center  items-center text-amber-50 text-2xl ">
          <li className="pr-5 hover:scale-x-110 hover:text-amber-500 transition-all duration-300">
            <Link onClick={navClose} href="/">
              Home
            </Link>
          </li>
          <li className="pr-5 hover:scale-x-110 hover:text-amber-500 transition-all duration-300">
            <Link onClick={navClose} href="/about">
              About
            </Link>
          </li>
          <li className="pr-5 hover:scale-x-110 hover:text-amber-500 transition-all duration-300">
            <Link onClick={navClose} href="/News">
              News
            </Link>
          </li>
          <li className="pr-5 hover:scale-x-110 hover:text-amber-500 transition-all duration-300">
            <Link onClick={navClose} href="/Gallery">
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
