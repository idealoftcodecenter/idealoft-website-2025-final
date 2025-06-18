"use client"
import Link from 'next/link';
import React from 'react';
import NavOverlay from './NavOverlay';
import NavLink from './NavLink';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import FloatingNav from "./FloatingNav";

const PageHeader = () => {
    const pathName = usePathname();

    return (
        <>
            <nav className="w-full flex md:justify-end items-center nav-list relative">
                <Link href="/" className="md:absolute left-0 top-0 w-unit-2 h-unit-2 z-10 bg-white">
                    <Image src="/assets/cont/idealoft-logo.svg" alt="Idealoft Studio Logo" width={100} height={100} className="w-full h-full" />
                </Link>
                <ul className="hidden relative md:flex flex-wrap mt-[var(--spacing-unit)] h-[var(--spacing-unit)]">
                    <li className={`relative z-10 h-full ${pathName === "/our-clients" && "active"}`}>
                        <NavLink href="/our-clients">Our Clients</NavLink>
                    </li>
                    <li className={`relative z-10 h-full ${pathName === "our-work" && "active"}`}>
                        <NavLink href="/our-work">Our Work</NavLink>
                    </li>
                    <li className="relative z-10 h-full">
                        <button className="flex items-center justify-center px-8 h-full uppercase">Quick Contact</button>
                    </li>
                    {/* ✅ overlay must be inside the same ul */}
                    <div className="nav-overlay absolute bg-[#D8FF69] rounded transition-all duration-200 pointer-events-none z-0"></div>
                    {/* ✅ must come last in ul for overlay layering */}
                    <NavOverlay />
                </ul>
            </nav>
            <FloatingNav />
        </>
    );
};

export default PageHeader;