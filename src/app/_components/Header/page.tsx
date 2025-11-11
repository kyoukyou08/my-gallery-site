import Link from "next/link";
import Nav from "../ui/nav/page";

export default function Header() {
  return (
    <>
      <div className=" flex justify-between align-middle items-center lg:py-3 py-8  lg:px-20 px-4  top-0 right-1 absolute h-[16px] w-screen">
        <div>
          <p className="text-slate-900 lg:text-4xl font-bold text-3xl">
            photo shelf
          </p>
        </div>
        <div>
          <Nav />
          <ul className="hidden lg:flex col gap-4 font-bold ">
            <li>
              <Link href="/src/app/about/page.tsx">about</Link>
            </li>
            <li>
              <Link href="#">contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
