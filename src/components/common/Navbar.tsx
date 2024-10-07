"use client";

import { DUMMY_MENUS } from "@/constants/dummy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-gray-200 sticky top-0 shadow z-40">
      <div className="max-w-screen-xl flex py-2 md:py-0 flex-wrap items-center justify-between px-3 md:px-8">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="text-xl font-semibold text-primary ms-2 md:ms-0">
            Newws<span className="text-secondary">!</span>
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="text-gray-500 hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <button className="btn btn-primary hidden md:block text-xs px-5 my-1">
            Sign in
          </button>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <ul className="list-none hidden md:flex flex-col text-sm md:p-0 gap-4 lg:gap-7 xl:gap-8 md:flex-row md:mt-0 md:border-0">
          {DUMMY_MENUS.map((menu, idx) => (
            <li key={idx} className="h-full">
              <Link href={menu.link}>
                <div
                  className={`h-9 mt-3 px-3 ${
                    pathname === menu.link
                      ? "bg-primary-dark text-white font-semibold md:bg-light md:text-primary md:border-b-2 md:border-b-primary"
                      : ""
                  } md:p-0`}
                >
                  {menu.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
